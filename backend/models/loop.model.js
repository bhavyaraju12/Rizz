import mongoose from "mongoose";

const loopSchema = new mongoose.Schema(
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
       
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
     comments: [
          {
            author:
           {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",},
            message:{
              type: String
            }
           
          },
        ],
  },
  { timestamps: true }
);

const Loop = mongoose.model("Loop", loopSchema);
export default Loop;
