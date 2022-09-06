import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";
import NextResponse from "../NextResponse";

import Start from "../Start";
import Choices from "../Choices";

import {getNextResponse} from "../../lib/ResponseGenerator";

import AudioStreamer from "../../lib/AudioHandler";

const Main = () => {
  const [startDigi, setStartDigi] = useState(false);
  const [recording, setRecording] = useState(false);

  const [scenario, setScenario]= useState("start");
  const [depth, setDepth] = useState(0);
  const videoRef = React.useRef();
  const choicesRef = React.useRef();
  let videoElement = videoRef.current;
  let choicesElement = choicesRef.current;
  const [videoUrl, setVideoUrl] = useState(
    "/digi_videos/starters/starter1.webm"
  );
  const [sttResponse, setSttResponse] = useState("")

  useEffect(() => {
    if (sttResponse) {
      const {nextScenario, nextDepth, video} = getNextResponse({scenario, depth, response: sttResponse})
      setScenario(nextScenario)
      setDepth(nextDepth)
      setVideoUrl(video)
    }
    
  },[sttResponse])

  useEffect(() => {
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;
  });

  const onVideoChange = (url) => {
    setVideoUrl(url);
  };

  const recordingCallback = (sttResponse) => {
    console.log('sttResponse', sttResponse)
    setSttResponse(sttResponse)
  }

  function startRecording() {
		console.log("audio start recording...", scenario);
		setRecording(true);
		AudioStreamer.initRecording(recordingCallback, (error) => {
			console.error("Error when recording", error);
			setRecording(false);
		});
	}

  const onVideoEnd = () => {
    startRecording();
  }


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
            onEnded={onVideoEnd}
            src={videoUrl}
            autoPlay
            ref={videoRef}
          />
          <Choices scenario={0} depth={0} choicesRef={choicesRef} />

          <RecordAudio />
          <NextResponse
            videoRef={videoRef}
            choicesRef={choicesRef}
            src={videoUrl}
            onVideoChange={onVideoChange}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
