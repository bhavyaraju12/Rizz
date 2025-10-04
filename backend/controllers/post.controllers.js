import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
    try {
        const { caption, mediaType } = req.body;
      
        let cloudinaryResponse; 

      
        if (req.file) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        } else {
            return res.status(400).json({ message: "Media file is required" });
        }

       
        const newPost = await Post.create({
            caption,
          
            media: cloudinaryResponse.secure_url,
            mediaType,
            author: req.userId
        });

       
        const user = await User.findById(req.userId);
        user.posts.push(newPost._id);
        await user.save();

        
        const populatedPost = await Post.findById(newPost._id).populate("author", "fullName userName profileImage");

        return res.status(201).json(populatedPost);

    } catch (error) {
        console.error("Error uploading post:", error);
        return res.status(500).json({ message: `Server error uploading post: ${error.message}` });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("author", "fullName userName profileImage").populate("comments.author", "fullName userName profileImage").sort({createdAt:-1});
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting posts:", error);
        return res.status(500).json({ message: `Server error getting posts: ${error.message}` });
    }
}


export const like = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

       
        const alreadyLiked = post.likes.some(id => id.toString() === req.userId.toString());

        if (alreadyLiked) {
            
            post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
        } else {
          
            post.likes.push(req.userId);
        }

        await post.save();

        
        await post.populate("author", "fullName userName profileImage");

        return res.status(200).json({ post, liked: !alreadyLiked });

    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({ message: `Server error liking post: ${error.message}` });
    }
}

export const comment = async (req, res) => {
    try {
        const { message } = req.body;
        const postId = req.params.postId;
        let post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({
            author: req.userId,
            message
        });

        await post.save();

        
        post = await post.populate([
            { path: "author", select: "fullName userName profileImage" },
            { path: "comments.author", select: "fullName userName profileImage" }
        ]);

        return res.status(200).json(post);

    } catch (error) {
        console.error("Error commenting on post:", error);
        return res.status(500).json({ message: `Server error commenting on post: ${error.message}` });
    }
}


export const saved = async (req, res) => {
    try {
        const postId = req.params.postId;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        const alreadySaved = user.saved.some(id => id.toString() === postId.toString());

        if (alreadySaved) {
        
            user.saved = user.saved.filter(id => id.toString() !== postId.toString());
        } else {
         
            user.saved.push(postId);
        }

        await user.save();
      
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error saving post:", error);
        return res.status(500).json({ message: `Server error saving post: ${error.message}` });
    }
}