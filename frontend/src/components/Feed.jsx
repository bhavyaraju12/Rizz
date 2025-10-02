import React from "react";
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo-main-b.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
  const { posts } = useSelector(state => state.post); // Assuming your data is state.post.posts

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-black border-r-2 border-gray-900">
      
      {/* Header */}
      <div className="w-full h-[100px] flex items-center px-5 justify-between lg:hidden">
        <img src={logo} alt="Logo" className="h-[100px] w-auto mb-2.5" />
        <FaRegHeart className="text-white" size={25} />
      </div>

      {/* Story Section */}
      <div className="flex w-full overflow-x-auto gap-[20px] items-center p-[20px] hide-scrollbar">
        <StoryDp userName="abcde" />
        {/* ...other stories... */}
      </div>

      {/* Post Feed Section */}
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav/>

        {/* FIX: Correctly mapping over the posts array and rendering the Post component */}
        {posts?.map((post) => (
          <Post postData={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;