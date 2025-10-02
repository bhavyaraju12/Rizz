import React, { useRef, useState } from 'react';
import { BiVolumeMute } from "react-icons/bi";
import { FaVolumeUp } from "react-icons/fa";


const VideoPlayer = ({ media }) => {
    const videoTag = useRef(null);
    
    
    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleVideoClick = () => {
        if (isPlaying) {
            videoTag.current.pause();
            setIsPlaying(false);
        } else {
            videoTag.current.play();
            setIsPlaying(true);
        }
    };

  
    const handleMuteClick = (e) => {
        e.stopPropagation(); 
        setMuted(prev => !prev);
    };

    return (
    
        <div className='h-full w-full relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
            
          
            <video 
                ref={videoTag} 
                src={media} 
                autoPlay 
                loop 
                muted={muted} 
                className='h-full w-full object-cover rounded-2xl' 
                onClick={handleVideoClick}
            />

            
            <div 
                className='absolute bottom-[10px] right-[10px] p-2' 
                onClick={handleMuteClick}
            >
                {muted 
                    ? <BiVolumeMute className='w-[20px] h-[20px] text-white font-semibold' />
                    : <FaVolumeUp className='w-[20px] h-[20px] text-white font-semibold' />
                }
            </div>
        </div>
    );
};

export default VideoPlayer;