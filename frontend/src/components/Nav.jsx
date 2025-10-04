import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import dp from "../assets/dp.png";

const Nav = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);


  const handleProfileClick = () => {
    if (userData?.userName) {
      navigate(`/profile/${userData.userName}`);
    }
  };

  return (
   
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex items-center justify-around fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>

      
      <button onClick={() => navigate("/")} aria-label="Home">
        <GoHomeFill className='text-white w-[30px] h-[30px] cursor-pointer' />
      </button>

      <button aria-label="Search">
        <FaSearch className='text-white w-[30px] h-[30px] cursor-pointer' />
      </button>

      <button onClick={() => navigate("/upload")} aria-label="Create Post">
        <FaRegPlusSquare className='text-white w-[30px] h-[30px] cursor-pointer' />
      </button>

      <button aria-label="Reels">
        <BiMoviePlay className='text-white w-[30px] h-[30px] cursor-pointer' />
      </button>

      <button
        className='w-[40px] h-[40px] border-2 border-transparent focus:border-white focus:outline-none rounded-full overflow-hidden cursor-pointer'
        onClick={handleProfileClick}
        aria-label="View Profile"
      >
        <img
          src={userData?.profileImage || dp}
          alt={userData?.fullName || "User Profile"} 
          className='w-full h-full object-cover'
        />
      </button>
    </div>
  );
};

export default Nav;
