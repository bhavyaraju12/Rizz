import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/Mail.js";

export const signUp = async (req, res) => {
  try {
    console.log("Received signup data:", req.body);
    let { fullName, email, password, userName } = req.body;

    // Trim inputs
    userName = userName?.trim();
    fullName = fullName?.trim();
    email = email?.trim();

    // Required field validation
    if (!fullName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check duplicates
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    // Handle specific duplicate key errors from the database
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value detected" });
    }
    console.error("Signup Error:", error);
    return res.status(500).json({ message: `Server error during signup: ${error.message}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "Strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({ message: `Server error during signin: ${error.message}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "SignOut successfully" });
  } catch (error) {
    console.error("SignOut Error:", error);
    return res.status(500).json({ message: `Server error during signout: ${error.message}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: `Server error during OTP send: ${error.message}` });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Expired or Invalid OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: `Server error during OTP verification: ${error.message}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: `Server error during password reset: ${error.message}` });
  }
};