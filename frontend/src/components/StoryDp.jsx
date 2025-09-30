import React from 'react';
import dp from "../assets/dp.png";

const StoryDp = ({ ProfileImage, userName }) => {
  return (
    <div className='flex flex-col items-center cursor-pointer w-[60px]'>
      <div className='w-[60px] h-[60px] bg-gradient-to-l from-blue-500 to-pink-500 p-[2px] rounded-full flex justify-center items-center overflow-hidden'>
        <div className='w-[50px] h-[50px] border-2 border-black rounded-full overflow-hidden'>
          <img src={ProfileImage || dp} alt={userName} className='w-full h-full object-cover' />
        </div>
      </div>
      <span className='text-white text-sm mt-1 truncate w-[80px] text-center'>{userName}</span>

    </div>
  );
};

export default StoryDp;
