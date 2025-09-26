import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    // 1. Log the specific error message for easier debugging.
    console.error("❌ MongoDB connection error:", error.message);
    
    // 2. Exit the application process if the database connection fails.
    process.exit(1);
  }
};

export default connectDb;
