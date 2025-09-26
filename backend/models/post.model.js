import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      // FIX: Changed mongoose.schema to mongoose.Schema (capital 'S')
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: { // Renamed to camelCase for consistency
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    likes: [
      {
        // FIX: Changed mongoose.schema to mongoose.Schema
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // SUGGESTION: This currently only stores who commented, not what they said.
    // Consider changing this to an array of objects: 
    // comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: String }]
    comments: [
      {
        // FIX: Changed mongoose.schema to mongoose.Schema
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
