// Nav.js

import React from 'react';
// ✅ Import necessary hooks
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

  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex items-center justify-around fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
     
      <div onClick={()=>navigate("/")}><GoHomeFill className='text-white w-[30px] h-[30px] cursor-pointer' /></div>
      <div><FaSearch className='text-white w-[30px] h-[30px]' /></div>
      <div><FaRegPlusSquare className='text-white w-[30px] h-[30px]' /></div>
      <div><BiMoviePlay className='text-white w-[30px] h-[30px]' /></div>

      <div
        className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
        onClick={() => navigate(`/profile/${userData.userName}`)}
      >
      
        <img
          src={userData?.profileImage || dp}
          alt="User Profile"
          className='w-full h-full object-cover' 
        />
      </div>
    </div>
  );
};

export default Nav;