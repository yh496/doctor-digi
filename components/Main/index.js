import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";

import Start from "../Start";
import Choices from "../Choices";

import { getNextResponse } from "../../lib/ResponseGenerator";

import AudioStreamer from "../../lib/AudioHandler";

const Main = () => {
  const videoRef = useRef();
  const choicesRef = useRef();
  let videoElement = videoRef.current;
  let choicesElement = choicesRef.current;


  const [startDigi, setStartDigi] = useState(false);

  const [responseTrigger, setResponseTrigger] = useState(false);
  const [recording, setRecording] = useState(false);

  const [scenario, setScenario] = useState("start");
  const [depth, setDepth] = useState(0);

  const [videoUrl, setVideoUrl] = useState("/digi_videos/starters/starter1.webm");

  const [sttResponse, setSttResponse] = useState("");
  const [choices, setChoices] = useState(["Schedule an Appointment", "Check Symptoms", "Drug Info"]);

  useEffect(() => {
    if (sttResponse) {
      const { nextScenario, nextDepth, video, nextChoices } = getNextResponse({
        scenario,
        depth,
        response: sttResponse,
      });
      setScenario(nextScenario);
      setDepth(nextDepth);
      onVideoChange(video);
      setChoices(nextChoices);
    }
  }, [responseTrigger]);

  useEffect(() => {
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;
  }, []);

  const onVideoChange = (url) => {
    if (videoElement) {
      videoElement = videoRef.current;
      videoElement.style = "";
      choicesElement.style = "";
      videoElement.style.opacity = 0;
      videoElement.style.transitionDuration = 0;
      choicesElement.style.opacity = 0;
      choicesElement.style.transitionDuration = 0;
      setVideoUrl(url);
      setTimeout(() => {
        videoElement.style.opacity = 1;
        videoElement.style.transitionDuration = "1.5s";
        choicesElement.style.opacity = 1;
        choicesElement.style.transitionDuration = "1.5s";
      }, 100);
    }
  };
  
  const recordingCallback = (sttResponse) => {
    setSttResponse(sttResponse);
    setResponseTrigger(!responseTrigger)
  };

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
            onEnded={onVideoEnd}
            src={videoUrl}
            autoPlay
            ref={videoRef}
          />
          {choices.length > 0 && <Choices choices={choices} choicesRef={choicesRef} />}
        </div>
      )}
    </div>
  );
};

export default Main;
