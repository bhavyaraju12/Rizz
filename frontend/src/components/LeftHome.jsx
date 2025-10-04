import React from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import {setUserData} from "../redux/userSlice"
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo-main-b.png"
import dp from "../assets/dp.png"
import OtherUser from './OtherUser';
import { useNavigate } from 'react-router-dom';
const LeftHome = () => {
  const navigate=useNavigate()
  const {userData,suggestedUsers}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const handleLogOut=async()=>{
    try{
const result=await axios.post(
  `${serverUrl}/api/auth/signout`, 
  {}, // empty body 
  { withCredentials: true } // config
)

dispatch(setUserData(null))

    }catch(error){
console.log(error)
    }
  }
  return (
  <div className="w-[33%] hidden lg:flex flex-col h-screen bg-black border-r-2 border-gray-900">
    
 <div className="w-full h-[100px] flex items-center px-5">
  <img src={logo} alt="Logo" className="h-[100px] w-auto mb-2.5 ml-1" />
  
  <div> 
    <FaRegHeart className='text-white w-[25px] h-[25px] mb-4 ml-35' /> 
  </div>
</div>
 <div className='flex items-center w-full justify-between gap-[10px] px-10 border-b-2 border-b-gray-900 py-[10px]' >
  <div className='flex items-center gap-[10px]'> 
  <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'  onClick={() => navigate(`/profile/${userData.userName}`)} >
<img src={userData.profileImage || dp} alt="" className='w-full object-cover' /></div>
<div onClick={() => navigate(`/profile/${userData.userName}`)} className='cursor-pointer'>
  <div className='text-[18px] text-white font-semibold'> {userData.userName}</div>
  <div className='text-[15px] text-gray-400 font-semibold'>{userData.fullName} </div>
</div>
</div>
<button className='text-blue-500 font-semibold cursor-pointer'  onClick={handleLogOut}>
  Log Out
</button>
 </div>
 <div className='w-full flex flex-col gap-[20px] p-[20px]'>
<h1 className='text-[white] text-[19px]'>Suggested Users</h1>
{suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
  <OtherUser key={index} user={user} />
))}
 </div>
</div>

  )
}

export default LeftHome
