import React, { useEffect, useState } from 'react'; // 1. Import useState
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProfileData, setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png";
import Nav from '../components/Nav';

const Profile = () => {
    const { userName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profileData, userData } = useSelector((state) => state.user);

    // 2. Add state for handling errors
    const [error, setError] = useState(null);

    const handleLogOut = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/signout`, {}, { withCredentials: true });
            dispatch(setUserData(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
   
        const controller = new AbortController();
        const signal = controller.signal;

        const handleProfile = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, {
                    withCredentials: true,
                    signal // Pass the signal to the axios request
                });
                dispatch(setProfileData(result.data));
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else {
                    console.error("Get Profile Error:", err);
                    setError("Failed to load profile. The user may not exist.");
                }
            }
        };
        
        // Reset state before fetching new profile
        dispatch(setProfileData(null));
        setError(null);
        handleProfile();

        // Cleanup function to abort the request if the component unmounts
        return () => {
            controller.abort();
        };

    }, [userName, dispatch]);

    // 4. Update loading and error states
    if (error) {
        return (
            <div className="w-full min-h-screen bg-black flex justify-center items-center text-red-500 text-xl">
                {error}
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="w-full min-h-screen bg-black flex justify-center items-center text-white text-xl">
                Loading Profile...
            </div>
        );
    }
    
    // 5. Check if the current profile belongs to the logged-in user
    const isOwnProfile = profileData._id === userData?._id;

    return (
        <div className='w-full min-h-screen bg-black text-white'>
            <div className='w-full h-[80px] flex justify-between items-center px-[30px]'>
                <div onClick={() => navigate('/')} className="cursor-pointer">
                    <IoMdArrowRoundBack className='w-[30px] h-[30px]' />
                </div>
                <div className='text-[20px] font-semibold'>{profileData.userName}</div>
                {/* 6. Only show Log Out button on the user's own profile */}
                {isOwnProfile ? (
                    <div className='font-semibold cursor-pointer text-[20px] text-blue-500' onClick={handleLogOut}>
                        Log Out
                    </div>
                ) : <div className='w-[60px]'/> /* Placeholder to keep layout consistent */}
            </div>

            <div className='w-full px-[30px] lg:px-[100px]'>
                <div className='w-full flex items-center gap-[20px] lg:gap-[50px] pt-[20px] justify-start'>
                    <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0'>
                        <img src={profileData.profileImage || dp} alt={`${profileData.userName}'s profile`} className='w-full h-full object-cover' />
                    </div>
                    <div className="flex-grow flex items-center justify-around text-center">
                        <div>
                            <div className="font-bold text-lg">{profileData.posts?.length || 0}</div>
                            <div className="text-gray-400">Posts</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">{profileData.followers?.length || 0}</div>
                            <div className="text-gray-400">Followers</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">{profileData.following?.length || 0}</div>
                            <div className="text-gray-400">Following</div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 text-left">
                    <div className="font-bold text-lg">{profileData.fullName}</div>
                    <div className="text-gray-400 text-md">{profileData.profession}</div>
                    <p className="pt-2 text-md">{profileData.bio}</p>
                </div>
            </div>
            
            <div className='w-full h-[80px] flex justify-center items-center gap-[20px]'>
          
                {isOwnProfile ? (
                    <button className='w-[150px] h-[40px] bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 ease-in-out' onClick={() => navigate("/editprofile")}>
                        Edit Profile
                    </button>
                ) : (
                    <>
                        <button className='w-[150px] h-[40px] bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 ease-in-out'>
                            Follow
                        </button>
                        <button className='w-[150px] h-[40px] bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 ease-in-out'>
                            Message
                        </button>
                    </>
                )}
            </div>
            
            <div className='w-full min-h-[100vh] flex justify-center'>
                <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]'>
                    <Nav/>
                </div>
            </div>
        </div>
    );
};

export default Profile;