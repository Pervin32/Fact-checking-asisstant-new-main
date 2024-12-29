import React, { useRef } from 'react';

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
        <source src="https://s3-figma-videos-production-sig.figma.com/video/TEAM/1217365378199853181/8e4a4592ef2f53e2d7f750ab40e363cb75a4f322?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IR14K7AdgIzY2N0L5SXNN75DTgcXo6KN4mMplMABvixnanAiKNGvqVXpVAXk5hVrmm8RAP8x~DBNfQshGc5J7Qs3Rzx~t3n-Xzi~JlRgjNPfiVXHV321XKJ-nyiLhT4G5X~1mqF5N~g2BpD5VnjehLrEW~oFUKcnA0XMGNOZ8QImeyTHt14tG9mgTpLZzBr7KEjYluefuUAwtOomGZ6Y-zh~lurZm5AQ96pyUJa37aebaTkK1-vs59yUZCroI7lqeYv6uTw34tSpfnQdhrKxu5rCeKJjvX~CK2-6-fIBfvJ5jQnSEgKbtgzkZZZue8q17DZPxK09Pn9a-ISzHlA0jw__" type="video/mp4" />


      </video>
    </div>
  );
};

export default VideoComponent;
