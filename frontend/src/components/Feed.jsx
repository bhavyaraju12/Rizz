import React from "react";
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo-main-b.png";
import StoryDp from "./StoryDp";

const Feed = () => {
  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-black border-r-2 border-gray-900">
      
      {/* Header */}
      <div className="w-full h-[100px] flex items-center px-5 justify-between lg:hidden">
        <img src={logo} alt="Logo" className="h-[100px] w-auto mb-2.5" />
        <FaRegHeart className="text-white" size={25} />
      </div>

     <div className="flex w-full overflow-auto gap-[20px] items-center p-[20px]">
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
<StoryDp userName={"abcde"}/>
     </div>
    </div>
  );
};

export default Feed;
