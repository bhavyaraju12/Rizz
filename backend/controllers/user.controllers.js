import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({ message: `Server error getting current user: ${error.message}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get Suggested Users Error:", error);
    return res.status(500).json({ message: `Server error getting suggested users: ${error.message}` });
  }
};



export const editProfile = async (req, res) => {
  try {
    const { fullName, userName, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sameUserWithUsername = await User.findOne({ userName: userName }).select("-password");
    if (sameUserWithUsername && sameUserWithUsername._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: "Username already taken" });
    }

    
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    
      if (cloudinaryResponse && cloudinaryResponse.url) {
        user.profileImage = cloudinaryResponse.url;
      }
    }

   
    user.fullName = fullName;
    user.userName = userName;
    if(profileImage){
      user.profileImage = profileImage;
    }
   
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    
    await user.save();
    return res.status(200).json(user);

  } catch (error) {
    console.error("Edit Profile Error:", error);
    return res.status(500).json({ message: `Server error editing profile: ${error.message}` });
  }
};



export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;

    const user = await User.findOne({ userName: userName }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: `Server error getting profile: ${error.message}` });
  }
};

