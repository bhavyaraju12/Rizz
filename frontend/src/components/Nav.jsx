import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import dp from "../assets/dp.png"

const Nav = () => {
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex items-center justify-around fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
      
      <div>
        <GoHomeFill className='text-white w-[30px] h-[30px]'/>
      </div>
      <div><FaSearch className='text-white w-[30px] h-[30px]' /></div>
      <div><FaRegPlusSquare className='text-white w-[30px] h-[30px]'/></div>
      <div><BiMoviePlay className='text-white w-[30px] h-[30px]'/></div>
    <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
      <img src={dp} alt="" className='w-full object-cover' /></div>
    </div>
  )
}

export default Nav
