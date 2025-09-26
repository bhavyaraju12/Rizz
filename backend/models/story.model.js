import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      // FIX: Changed mongoose.schema to mongoose.Schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    // FIX: Changed 'viewers' to be an array and not required.
    // A story starts with zero viewers.
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      // FIX: Use Date.now without parentheses to set the timestamp on creation.
      // This also creates a TTL index to auto-delete the story after 24 hours (86400 seconds).
      default: Date.now,
      expires: 86400, 
    },
  },
  // NOTE: timestamps:true will add createdAt and updatedAt. Since you have a custom
  // createdAt for expiration, you might not need both, but it doesn't cause harm.
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
