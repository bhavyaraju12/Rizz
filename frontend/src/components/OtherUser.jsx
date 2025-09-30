import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.png"

const OtherUser = ({user}) => {
    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800'>
       <div className='flex items-center gap-[10px]'> 
        <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
      <img src={user.profileImage || dp} alt="" className='w-full object-cover' /></div>
      <div>
        <div className='text-[18px] text-white font-semibold'> {user.userName}</div>
        <div className='text-[15px] text-gray-400 font-semibold'>{user.fullName} </div>
      </div>
      </div>
      <button className="px-[6px] w-[70px] py-[3px] h-[30px] bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-2xl 
                   hover:scale-105 hover:from-cyan-500 hover:to-cyan-500 transition-all duration-600 ease-in-out">
  Follow
</button>

    </div>
  )
}

export default OtherUser
