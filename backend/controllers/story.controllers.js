import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";

export const uploadStory = async (req, res) => { 
    try {
        const user = await User.findById(req.userId);

        // This logic correctly replaces the old story
        if (user.story) {
            await Story.findByIdAndDelete(user.story);
            user.story = null;
        }

        const { mediaType } = req.body;
        let cloudinaryResponse;

        if (req.file) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        } else {
            return res.status(400).json({ message: "Media file is required" });
        }

        const story = await Story.create({
            author: req.userId,
            // FIX: Saved the secure_url string, not the entire object.
            media: cloudinaryResponse.secure_url,
            mediaType,
        });

        user.story = story._id;
        await user.save();

        const populatedStory = await Story.findById(story._id).populate("author", "fullName userName profileImage");
        return res.status(201).json(populatedStory);
    } catch (error) {
        return res.status(500).json({ message: `Server error uploading story: ${error.message}` });
    }
}

export const viewStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }   

        // FIX 1: Defined 'alreadyViewed' before using it.
        const alreadyViewed = story.viewers.some(id => id.toString() === req.userId.toString());

        if (!alreadyViewed) {
            story.viewers.push(req.userId);
            await story.save();
        }

        const populatedStory = await Story.findById(story._id)
            .populate("author", "fullName userName profileImage")
            .populate("viewers", "fullName userName profileImage");

        // FIX 2: Returned the 'populatedStory' and the correct boolean.
        return res.status(200).json({ story: populatedStory, viewed: true });
    } catch (error) {
        return res.status(500).json({ message: `Server error viewing story: ${error.message}` });
    }
}

export const getStoryByUserName = async (req, res) => {
    try {
        const { userName } = req.params;
        const user = await User.findOne({ userName: userName });     
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // FIX 1: Check if the user actually has a story.
        if (!user.story) {
            return res.status(200).json(null); // Return null or an empty object if no story exists
        }

        // FIX 2: Fetched the single story using the ID from the user object.
        const story = await Story.findById(user.story)
            .populate("author", "fullName userName profileImage")
            .populate("viewers", "fullName userName profileImage");

        if (!story) {
             return res.status(404).json({ message: "Story not found" });
        }
        
        // FIX 3: Added the missing return statement to send the response.
        return res.status(200).json(story);

    } catch (error) {
        return res.status(500).json({ message: `Server error getting story by username: ${error.message}` });
    }
}