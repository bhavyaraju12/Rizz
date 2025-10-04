import React from "react";
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo-main-b.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
  const { post } = useSelector((state) => state.post);

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-black border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center px-5 justify-between lg:hidden">
        <img src={logo} alt="Logo" className="h-[100px] w-auto mb-2.5" />
        <FaRegHeart className="text-white" size={25} />
      </div>

  
<div className="flex w-full overflow-x-auto gap-[20px] items-center p-[20px] hide-scrollbar">
  <StoryDp userName="abcde" />
  <StoryDp userName="fghij" />
  <StoryDp userName="klmno" />
  <StoryDp userName="pqrst" />
  <StoryDp userName="uvwxy" />
  <StoryDp userName="z1234" />
</div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />

        {post?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
