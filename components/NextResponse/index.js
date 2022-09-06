import React, { useState, useEffect, useRef } from "react";

const NextResponse = (props) => {
  const changeVideo = () => {
    const videoElement = props.videoRef.current;
    const choicesElement = props.choicesRef.current;

    const deviceWidth =
      window.innerWidth > 0 ? window.innerWidth : screen.width;

    if (videoElement) {
      videoElement.style.opacity = 0;
      videoElement.style.transitionDuration = 0;
      choicesElement.style.opacity = 0;
      choicesElement.style.transitionDuration = 0;

      props.onVideoChange("/digi_videos/scenario1/depth1.webm");

      setTimeout(() => {
        videoElement.style.opacity = 1;
        videoElement.style.transitionDuration = "1.5s";
        choicesElement.style.opacity = 1;
        choicesElement.style.transitionDuration = "1.5s";
      }, 100);
    }
  };

  return (
    <div>
      <button width="400px" height="100px" onClick={changeVideo}>
        Next Video
      </button>
    </div>
  );
};

export default NextResponse;
