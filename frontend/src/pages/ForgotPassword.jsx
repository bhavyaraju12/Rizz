import React, { useState } from "react";
import axios from "axios";
import { Sparkles, MessageCircle, Mail } from "lucide-react";
import { serverUrl } from "../App";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1: Send OTP
  const handleStep1 = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email: formData.email },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleStep2 = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email: formData.email, otp: formData.otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleStep3 = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email: formData.email, password: formData.newPassword },
        { withCredentials: true }
      );
      console.log(result.data);
      alert("Password reset successful!");
      setStep(1);
      setFormData({ email: "", otp: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Main submit handler (changes depending on step)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) handleStep1();
    else if (step === 2) handleStep2();
    else if (step === 3) handleStep3();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background & UI elements skipped for brevity */}

      <div className="w-full max-w-md relative z-10">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Email */}
          {step === 1 && (
            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                OTP
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <>
              <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all disabled:opacity-50"
          >
            {isLoading ? "Loading..." : step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
