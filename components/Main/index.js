import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";
import NextResponse from "../NextResponse";

import Start from "../Start";
import Choices from "../Choices";

const Main = () => {
  const [startDigi, setStartDigi] = useState(false);
  const videoRef = React.useRef();
  let videoElement = videoRef.current;
  const [videoUrl, setVideoUrl] = useState(
    "/digi_videos/starters/starter1.webm"
  );

  useEffect(() => {
    videoElement = videoRef.current;
  });

  const onVideoChange = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className={Styles.mainContainer}>
      {!startDigi ? (
        <Start
          onClick={() => {
            setStartDigi(true);
          }}
        />
      ) : (
        <div className={Styles.digiContainer}>
          <video
            className={Styles.video}
            width="960px"
            height="540px"
            src={videoUrl}
            autoPlay
            ref={videoRef}
          />
          <Choices scenario={0} depth={0} />

          <RecordAudio />
          <NextResponse
            videoRef={videoRef}
            src={videoUrl}
            onVideoChange={onVideoChange}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
