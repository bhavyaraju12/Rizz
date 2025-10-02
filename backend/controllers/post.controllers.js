import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
    try {
        const { caption, mediaType } = req.body;
        // Renamed for clarity to match your other function
        let cloudinaryResponse; 

        // Check for media file and upload to Cloudinary
        if (req.file) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        } else {
            return res.status(400).json({ message: "Media file is required" });
        }

        // Create the new post in the database
        const newPost = await Post.create({
            caption,
            // ✅ THE FIX: Use the secure_url property from the response
            media: cloudinaryResponse.secure_url,
            mediaType,
            author: req.userId
        });

        // Add the new post's ID to the user's posts array
        const user = await User.findById(req.userId);
        user.posts.push(newPost._id);
        await user.save();

        // Fetch the newly created post and populate the author details
        const populatedPost = await Post.findById(newPost._id).populate("author", "fullName userName profileImage");

        return res.status(201).json(populatedPost);

    } catch (error) {
        console.error("Error uploading post:", error);
        return res.status(500).json({ message: `Server error uploading post: ${error.message}` });
    }
}

// --- Get All Posts ---
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("author", "fullName userName profileImage");
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting posts:", error);
        return res.status(500).json({ message: `Server error getting posts: ${error.message}` });
    }
}

// --- Like or Unlike a Post ---
export const like = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.some(id => id.toString() === req.userId.toString());

        if (alreadyLiked) {
            // Unlike: Remove user's ID from the likes array
            post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
        } else {
            // Like: Add user's ID to the likes array
            post.likes.push(req.userId);
        }

        await post.save();

        // Populate author details to send back the full post object
        await post.populate("author", "fullName userName profileImage");

        return res.status(200).json({ post, liked: !alreadyLiked });

    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({ message: `Server error liking post: ${error.message}` });
    }
}

// --- Add a Comment to a Post ---
export const comment = async (req, res) => {
    try {
        const { message } = req.body;
        const postId = req.params.postId;
        let post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Add the new comment
        post.comments.push({
            author: req.userId,
            message
        });

        await post.save();

        // Re-populate the post to include details of the new comment's author
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

// --- Save or Unsave a Post ---
export const saved = async (req, res) => {
    try {
        const postId = req.params.postId;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the post is already in the user's saved list
        const alreadySaved = user.saved.some(id => id.toString() === postId.toString());

        if (alreadySaved) {
            // Unsave: Remove post ID from the saved array
            user.saved = user.saved.filter(id => id.toString() !== postId.toString());
        } else {
            // Save: Add post ID to the saved array
            user.saved.push(postId);
        }

        await user.save();

        // Populate the saved posts with their author details
        await user.populate({
            path: "saved",
            populate: {
                path: "author",
                select: "fullName userName profileImage"
            }
        });

        return res.status(200).json(user);

    } catch (error) {
        console.error("Error saving post:", error);
        return res.status(500).json({ message: `Server error saving post: ${error.message}` });
    }
}