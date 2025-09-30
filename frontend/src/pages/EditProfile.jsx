import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setProfileData, setUserData } from "../redux/userSlice"; 
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.png";
import { serverUrl } from "../App"; 
import ClipLoader from "react-spinners/ClipLoader";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const imageInput = useRef();

  const [frontendImage, setFrontendImage] = useState(userData.profileImage || dp);
  const [backendImage, setBackendImage] = useState(null); 

  const [name, setName] = useState(userData.fullName || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleGoBack = () => {
    if (userData && userData.userName) {
      navigate(`/profile/${userData.userName}`);
    } else {
      navigate(-1);
    }
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
    formData.append("fullName", name);
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("profession", profession);
      formData.append("gender", gender);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }
      const result = await axios.post(`${serverUrl}/api/user/editProfile`, formData, { withCredentials: true });
      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
     setLoading(false);
      navigate(`/profile/${result.data.userName}`);
    } catch (error) {
        setLoading(false);
      console.error("Edit Profile Error:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] pb-10">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={handleGoBack}
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>

      <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0 cursor-pointer " onClick={() => imageInput.current.click()}>
        <input type="file" accept="image/*" ref={imageInput} hidden onChange={handleImage} />
        <img
          src={frontendImage}
          alt="Profile Preview"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-blue-500 text-center font-semibold text-[18px] cursor-pointer" onClick={() => imageInput.current.click()}>
        Change Your Profile Picture
      </div>

      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} value={name} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold" placeholder="Enter Your UserName" onChange={(e) => setUserName(e.target.value)} value={userName} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold" placeholder="Enter Your Bio" onChange={(e) => setBio(e.target.value)} value={bio} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold" placeholder="Enter Your Profession" onChange={(e) => setProfession(e.target.value)} value={profession} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold" placeholder="Enter Your Gender" onChange={(e) => setGender(e.target.value)} value={gender} />

      <button onClick={handleEditProfile} className="w-[150px] h-[40px] bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 ease-in-out">{loading?<ClipLoader size={30} color='black'/>:"Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;