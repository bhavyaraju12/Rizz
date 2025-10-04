import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegCommentDots, FaRegBookmark, FaRegPlusSquare } from "react-icons/fa";
import { IoBookmark, IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { updatePostLikes, updatePostComments } from "../redux/postSlice";
import { updateSavedPosts } from "../redux/userSlice";
import VideoPlayer from "./VideoPlayer";

const dp = "https://placehold.co/100x100/38BDF8/FFFFFF?text=DP";

const Post = ({
  post,
  frontendMedia,
  mediaInput,
  handleMedia,
  uploadType,
  setCaption,
  caption,
}) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleLike = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/post/like/${post._id}`,
        {},
        { withCredentials: true }
      );
      if (data.post) {
        dispatch(updatePostLikes({ postId: post._id, likes: data.post.likes }));
      }
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  const handleComment = async () => {
    if (!message.trim()) return;
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/post/comment/${post._id}`,
        { message },
        { withCredentials: true }
      );
      if (data) {
        dispatch(
          updatePostComments({ postId: post._id, comments: data.comments })
        );
      }
      setMessage("");
    } catch (error) {
      console.error("Failed to comment on the post:", error);
    }
  };


 const handleSave = async () => {
  try {
  
    const { data } = await axios.post(
      `${serverUrl}/api/post/saved/${post._id}`,
      {}, 
      { withCredentials: true }
    );

    if (data && data.saved) {
   
      dispatch(updateSavedPosts(data.saved));
    }
  } catch (error) {
    console.error("Failed to save the post:", error);
  }
};

  if (!post || !post.author) {
    return null;
  }

  return (
    <div className="w-[90%] max-w-2xl flex flex-col bg-white items-center shadow-2xl shadow-[#313031] rounded-2xl mx-auto my-4 py-4">
     
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex justify-center items-center md:gap-[20px] gap-[10px] min-w-0">
          <div
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden flex-shrink-0"
            onClick={() => navigate(`/profile/${post.author.userName}`)}
          >
            <img
              src={post.author.profileImage || dp}
              alt={post.author.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-black font-semibold truncate w-auto">
            {post.author.userName}
          </div>
        </div>
        <button className="px-[10px] w-[80px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-2xl text-[14px] md:text-[16px] flex-shrink-0">
          Follow
        </button>
      </div>

     
      {post.media && (
        <div className="w-full mt-2">
          <div className="w-full">
            {post.mediaType === "image" ? (
              <img
                src={post.media}
                alt="Post content"
                className="w-full object-contain max-h-[75vh]"
              />
            ) : (
              <VideoPlayer media={post.media} />
            )}
          </div>
          <div className="p-4 w-full text-black">
            <p>
              <span className="font-bold mr-2">{post.author.userName}</span>
              {post.caption}
            </p>
          </div>
        </div>
      )}

      
 {/* Action Buttons */}
      <div className="w-full h-[60px] flex justify-between items-center px-[20px]">
        <div className="flex justify-center items-center gap-[20px]">
          {/* Like Button */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleLike}>
            {/* ✅ ADDED ?. HERE */}
            {post.likes.includes(userData?._id) ? (
              <FaHeart className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
            ) : (
              <FaRegHeart className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
            )}
            <span className="text-lg font-semibold text-gray-800">
              {post.likes.length}
            </span>
          </div>
          {/* Comment Button */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowComment((prev) => !prev)}>
            <FaRegCommentDots className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold text-gray-800">
              {post.comments.length}
            </span>
          </div>
        </div>
         <div onClick={handleSave} className="group cursor-pointer">
          {/* ✅ ADDED ?. HERE */}
          {userData?.saved.includes(post._id) ? (
            <IoBookmark className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
          ) : (
            <FaRegBookmark className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
          )}
        </div>
      </div>

     
   {showComment && (
        <div className="w-full px-2">
          <div className="w-full flex items-center gap-3 px-3 py-3 border-t border-gray-200">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
               
                src={userData?.profileImage || dp}
                alt={userData?.userName}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-grow bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              className="font-semibold text-cyan-600 hover:text-cyan-800 transition-colors disabled:text-gray-400"
              onClick={handleComment}
              disabled={!message.trim()}
            >
              <IoSend className="w-[25px] h-[25px]" />
            </button>
          </div>

       
          <div className="w-full max-h-[300px] overflow-y-auto px-3 py-2 flex flex-col gap-4">
            {post.comments?.map((comment) => (
              <div key={comment._id} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                  <img
                    src={comment.author.profileImage || dp}
                    alt={comment.author.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-gray-100 rounded-xl p-3">
                  <p className="font-bold text-gray-900">
                    {comment.author.userName}
                  </p>
                  <p className="text-gray-700">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;