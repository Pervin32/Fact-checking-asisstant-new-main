import React, { useRef } from 'react';
import Video from "../assets/img/home.mp4"

const VideoComponent = () => {
  // Video elementinə referans
  const videoRef = useRef(null);

  // Video dayandırma və oynatma funksiyası
  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play(); // Əgər video dayandırılıbsa, oynadın
    } else {
      videoRef.current.pause(); // Əgər video oynayırsa, dayandırın
    }
  };



  return (
    <div>
      <video
        className="w-[649px] h-[365px]"
        autoPlay
        muted
        loop
        ref={videoRef}
        onClick={handleVideoClick} // Video üzərinə basıldığında bu funksiyanı çağır
      >
        <source src={Video} type="video/mp4" />


      </video>
    </div>
  );
};

export default VideoComponent;
