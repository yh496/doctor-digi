import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";
import NextResponse from "../NextResponse";

const Main = () => {
  const videoRef = React.useRef();
  let videoElement = videoRef.current;
  const [videoUrl, setVideoUrl] = useState("/digi_videos/idle_v1.webm");
  const [videoTransitionDuration, setVideoTransitionDuration] = useState(0);

  useEffect(() => {
    videoElement = videoRef.current;
  });

  const onVideoChange = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className={Styles.mainContainer}>
      <video
        width="960px"
        height="540px"
        src={videoUrl}
        autoPlay
        loop
        ref={videoRef}
        style={{
          opacity: 1,
          transitionProperty: "all",
          transitionDuration: videoTransitionDuration,
          position: "absolute",
          left: 250,
          zIndex: 1,
          bottom: 100,
        }}
      />

      <RecordAudio />
      <NextResponse
        videoRef={videoRef}
        src={videoUrl}
        onVideoChange={onVideoChange}
      />
    </div>
  );
};

export default Main;
