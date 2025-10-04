import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import dp from '../assets/dp.png'; 
const Post = ({ postData }) => { 
  const navigate = useNavigate(); 
  if (!postData || !postData.author) {
    return null;
  }

  return (
    <div className='w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#313031] rounded-2xl'>
      <div className='w-full h-[80px] flex justify-between items-center px-[10px]'>
        <div className='flex justify-center items-center md:gap-[20px] gap-[10px]'>
      
        <div 
          className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden ' 
          onClick={() => navigate(`/profile/${postData.author.userName}`)}
        >
          <img 
            src={postData.author.profileImage || dp} 
            alt={postData.author.userName} 
            className='w-full h-full object-cover' 
          />
        </div>
        <div className='text-black font-semibold truncate w-[200px] '>
          {postData.author.userName}
        </div>
        
        </div>

      </div>
      
    
      <div className='w-full'>
        <img src={postData.media} alt="Post content" className='w-full object-cover' />
      </div>
      <div className='p-4 w-full text-black'>
        <p>
            <span className='font-bold mr-2'>{postData.author.userName}</span>
            {postData.caption}
        </p>
      </div>

    </div>
  );
};

export default Post;