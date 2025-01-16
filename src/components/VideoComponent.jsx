import React, { useRef } from 'react';
import Video from "../assets/img/home.mp4";

const VideoComponent = () => {
    const videoRef = useRef(null);

    const handleVideoClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <div className="relative w-full h-[calc(100vh-15rem)] md:h-[650px]">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                ref={videoRef}
                onClick={handleVideoClick}
                playsInline
            >
                <source src={Video} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoComponent;