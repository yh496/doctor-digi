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

  const [videoUrl, setVideoUrl] = useState(
    "/digi_videos/starters/starter1.webm"
  );
  const [videoLoop, setVideoLoop] = useState(false);

  const [sttResponse, setSttResponse] = useState("");
  const [choices, setChoices] = useState([
    "Schedule an Appointment",
    "Check Symptoms",
    "Drug Info",
  ]);

  useEffect(() => {
    if (sttResponse) {
      const { nextScenario, nextDepth, video, nextChoices } = getNextResponse({
        scenario,
        depth,
        response: sttResponse,
      });

      if (nextScenario) {
        setScenario(nextScenario);
      }
      if (nextDepth) {
        setDepth(nextDepth);
      }
      if (video) {
        onVideoChange(video, 0);
      }
      if (nextChoices) {
        setChoices(nextChoices);
      }
    }
  }, [responseTrigger]);

  useEffect(() => {
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;
  }, []);

  const onVideoChange = (url, idle = 0) => {
    setVideoLoop(false);
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;

    if (videoElement) {
      videoElement.style = "";
      if (choices?.length > 0) {
        choicesElement.style = "";
        choicesElement.style.opacity = 0;
        choicesElement.style.transitionDuration = 0;
      }
      videoElement.style.opacity = 0;
      videoElement.style.transitionDuration = 0;

      setVideoUrl(url);
      setTimeout(() => {
        videoElement.style.opacity = 1;
        videoElement.style.transitionDuration = idle ? "1s" : "1.5s";
        if (choices?.length > 0) {
          choicesElement.style.opacity = 1;
          choicesElement.style.transitionDuration = idle ? "1s" : "1.5s";
        }
      }, 100);
      AudioStreamer.stopRecording();
      videoElement.play();
    }
  };

  const recordingCallback = (sttResponse) => {
    setSttResponse(sttResponse);
    setResponseTrigger(!responseTrigger);
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
    onVideoChange("/digi_videos/idle_v1.webm", true);
    setVideoLoop(true);
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
            loop={videoLoop}
          />
          {choices && choices.length > 0 && (
            <Choices choices={choices} choicesRef={choicesRef} />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
