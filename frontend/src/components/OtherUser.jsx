import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 
import dp from "../assets/dp.png";


const OtherUser = ({ user }) => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const isFollowing = userData?.following?.includes(user?._id);

  
  const handleFollow = () => {
   
    console.log(`Follow/Unfollow user: ${user.userName}`);
  };

  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800'>
      <div className='flex items-center gap-[10px]'>
        <div
          className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
          onClick={() => navigate(`/profile/${user.userName}`)}
        >
          <img src={user.profileImage || dp} alt={`${user.userName}'s profile`} className='w-full h-full object-cover' />
        </div>
        <div>
          <div className='text-[18px] text-white font-semibold'>{user.userName}</div>
          <div className='text-[15px] text-gray-400 font-semibold'>{user.fullName}</div>
        </div>
      </div>
      
     
      <button
        onClick={handleFollow}
        className={`px-[6px] w-[85px] py-[3px] h-[30px] text-white rounded-2xl 
                   transition-all duration-300 ease-in-out font-semibold
                   ${isFollowing 
                     ? 'bg-gray-600 hover:bg-gray-700' 
                     : 'bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-105'
                   }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default OtherUser;