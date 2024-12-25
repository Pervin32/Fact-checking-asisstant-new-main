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
        <source src="https://s3-figma-videos-production-sig.figma.com/video/TEAM/1217365378199853181/8e4a4592ef2f53e2d7f750ab40e363cb75a4f322?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ym2Y16qBK4u4dnbQTW6Ok7KfotJ3s4tVjaCMHeqWE6Exfb9kuiVRHC50k8LJRfXQNLRMBhKZsr4ac3dNwbRu8WA6Zu~QTf3MtC7JSaaEa7d2LAsTU3PM~XluEgh8i~02G4XEWE4LV6BTSBZGf7icT2ZVFBJTC4KfqTKDAM9qlC4xNPoxQ6aI118fTqhk8qfMB7rcwmY09L4sC-CQk8vo1efvVcxEo3uvykc9LyZRgMYV8JhyiEEF2tegtex9jxjPcgodmvTeOcj-CrjnbcTeWhzbxU83cay86aDz6UQz6ofuAKNs68QWN20U2-Ez38OTHG4NaV1gvZYgGfxZyz2q-Q__" type="video/mp4" />


      </video>
    </div>
  );
};

export default VideoComponent;
