import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App"; 
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch=useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const dataToSend = { ...formData }; 

  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signin`,
      dataToSend,
      { withCredentials: true }
    );
    dispatch(setUserData(result.data))
setIsLoading(false);
  } catch (error) {
    console.error(error);
    setError(error.response?.data?.message || "Something went wrong!");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-blue-300 opacity-60 animate-bounce">
        <MessageCircle size={24} />
      </div>
      <div
        className="absolute top-32 right-32 text-pink-300 opacity-60 animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        <Sparkles size={28} />
      </div>
      <div
        className="absolute bottom-32 left-32 text-cyan-300 opacity-60 animate-bounce"
        style={{ animationDelay: "1s" }}
      >
        <Sparkles size={20} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="relative">
              <MessageCircle className="text-cyan-400 w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Rizz
            </h1>
            <Sparkles className="text-pink-400 w-6 h-6 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg">
            Join the conversation that matters
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Connect, share, and discover your vibe
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
{/* Username */}
<div className="relative">
  <label className="block text-sm font-medium text-gray-200 mb-2">
    Username
  </label>
  <div className="relative">
    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      name="userName"
      value={formData.userName}
      onChange={handleInputChange}
      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
      placeholder="Enter your username"
      required
    />
  </div>
</div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
           <div>
             <Link
                to="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
              >
                Forgot Password?
              </Link>
</div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Lets get your rizz up!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Dont have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Social Login Options */}
          <div className="mt-8">
            <div className="relative">
              {/* <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
              </div> */}
            </div>

            {/* <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg shadow-sm bg-white/5 border border-white/20 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-200">
                <span>Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg shadow-sm bg-white/5 border border-white/20 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-200">
                <span>Apple</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}