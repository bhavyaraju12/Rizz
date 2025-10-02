import uploadOnCloudinary from "../config/cloudinary.js";
import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";

export const uploadLoop = async (req, res) => {
    try {
        // FIX: Destructured 'mediaType' from the request body.
        const { caption, mediaType } = req.body;
        let cloudinaryResponse;

        if (req.file) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        } else {
            return res.status(400).json({ message: "Media file is required" });
        }

        const loop = await Loop.create({
            caption,
            // FIX: Saved the secure_url string, not the entire object.
            media: cloudinaryResponse.secure_url,
            mediaType,
            author: req.userId
        });

        const user = await User.findById(req.userId);
        user.loops.push(loop._id);
        await user.save();

        const populatedLoop = await Loop.findById(loop._id).populate("author", "fullName userName profileImage");
        
        return res.status(201).json(populatedLoop);

    } catch (error) {
        return res.status(500).json({ message: `Server error uploading loop: ${error.message}` });
    }
}

export const like = async (req, res) => {
    try {
        const { loopId } = req.params;
        // FIX: Queried the correct 'Loop' model instead of 'Post'.
        const loop = await Loop.findById(loopId);

        if (!loop) {
            return res.status(404).json({ message: "Loop not found" });
        }
        
        const alreadyLiked = loop.likes.some(id => id.toString() === req.userId.toString());

        if (alreadyLiked) {
            loop.likes = loop.likes.filter(id => id.toString() !== req.userId.toString());
        } else {
            loop.likes.push(req.userId);
        }

        await loop.save();
        
        await loop.populate("author", "fullName userName profileImage");

        return res.status(200).json({ loop, liked: !alreadyLiked });
    } catch (error) {
        return res.status(500).json({ message: `Server error liking loop: ${error.message}` });
    }
}

export const comment = async (req, res) => {
    try {
        const { message } = req.body;
        const { loopId } = req.params;
        let loop = await Loop.findById(loopId);

        if (!loop) {
            return res.status(404).json({ message: "loop not found" });
        }
        
        loop.comments.push({
            author: req.userId,
            message
        });
        
        await loop.save();

        loop = await loop.populate([
            { path: "author", select: "fullName userName profileImage" },
            { path: "comments.author", select: "fullName userName profileImage" }
        ]);
        
        
        return res.status(200).json(loop);
    } catch (error) {
        return res.status(500).json({ message: `Server error commenting on loop: ${error.message}` });
    }
}

export const getAllLoops = async (req, res) => {
    try {
        
        const loops = await Loop.find({})
            .populate("author", "fullName userName profileImage")
            .populate("comments.author", "fullName userName profileImage")
            .sort({ createdAt: -1 }); 
            
        return res.status(200).json(loops);
    } catch (error) {
        return res.status(500).json({ message: `Server error getting loops: ${error.message}` });
    }
}