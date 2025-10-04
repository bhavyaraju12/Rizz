import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const Upload = ({ userData }) => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const mediaInput = useRef(null);
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoBack = () => {
   
    if (userData?.userName) {
      navigate(`/profile/${userData.userName}`);
    } else {
      navigate(-1);
    }
  };

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaType(file.type.includes("image") ? "image" : "video");
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
    setError(""); 
  };

  const handleUpload = async () => {
    if (!backendMedia) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("media", backendMedia);
    formData.append("mediaType", mediaType);

   
    if (uploadType !== "story") {
      formData.append("caption", caption);
    }
    
   
    const endpoint = `${serverUrl}/api/${uploadType}/upload`;

    try {
      const result = await axios.post(endpoint, formData, { withCredentials: true });
      console.log(`${uploadType} upload response`, result);
      
      
      handleGoBack();
    } catch (err) {
      console.error(`Error while uploading ${uploadType}`, err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 
  const TabButton = ({ type, label }) => {
    const isActive = uploadType === type;
    return (
      <div
        className={`
          w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold 
          rounded-full cursor-pointer transition-all duration-300
          hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black
          ${isActive ? "bg-black text-white shadow-2xl shadow-black" : "text-black"}
        `}
        onClick={() => setUploadType(type)}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center p-4 overflow-y-auto">
      {/* Header */}
      <div className="w-full max-w-[600px] h-[80px] flex items-center gap-5">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-7 h-7"
          onClick={handleGoBack}
        />
        <h1 className="text-white text-xl font-semibold">Upload Media</h1>
      </div>

      <div className="w-full max-w-[600px] h-[60px] bg-white rounded-full flex justify-around items-center my-4">
        <TabButton type="post" label="Post" />
        <TabButton type="story" label="Story" />
        <TabButton type="loop" label="Loop" />
      </div>

   
      <div className="w-full max-w-[500px] flex-grow flex flex-col items-center justify-center">
        {!frontendMedia ? (
         
          <div
            className="w-full h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer hover:bg-[#353a3d] text-gray-500"
            onClick={() => mediaInput.current.click()}
          >
            <input type="file" hidden ref={mediaInput} onChange={handleMedia} accept="image/*,video/*" />
            <FaRegPlusSquare className="w-8 h-8" />
            <p className="text-lg font-semibold">Upload {uploadType}</p>
          </div>
        ) : (
        
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full h-[250px] rounded-2xl overflow-hidden">
              {mediaType === "image" ? (
                <img src={frontendMedia} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <VideoPlayer media={frontendMedia} />
              )}
            </div>

            {uploadType !== "story" && (
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-gray-400 outline-none p-2 text-white text-lg"
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              />
            )}
            
            <button
              className="w-full max-w-[400px] h-[50px] bg-white text-black font-bold text-lg cursor-pointer rounded-2xl disabled:bg-gray-500 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? `Uploading ${uploadType}...` : `Upload ${uploadType}`}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;