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
  const [isScenarioEnd, setIsScenarioEnd] = useState(false);
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
  const [digiSpeech, setDigiSpeech] = useState([
    "Hello! What can I help you with today?",
  ]);

  const [chatState, setChatState] = useState([
    {
      aiText: "Hello! What can I help you with today?",
      choices: ["Schedule an Appointment", "Check Symptoms", "Drug Info"],
      userText: "",
    },
  ]);

  useEffect(() => {
    if (sttResponse) {
      const { nextScenario, nextDepth, video, nextChoices, isEnd, speech } =
        getNextResponse({
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
        console.log("SET!");
      }
      setIsScenarioEnd(isEnd);

      const newChat = {
        aiText: speech,
        choices: nextChoices,
      };
      let copyChatState = chatState;
      copyChatState.push(newChat);
      setChatState(copyChatState);
    }
  }, [responseTrigger]);

  useEffect(() => {
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;
  }, []);

  // useEffect(() => {
  //   if (AudioStreamer.timeOut) {
  //     setStartDigi(false);
  //     setVideoUrl("/digi_videos/starters/starter1.webm");
  //     setScenario("start");
  //     setDepth(0);
  //     setChoices(["Schedule an Appointment", "Check Symptoms", "Drug Info"]);
  //   }
  // }, [videoLoop]);

  const onVideoChange = (url, idle = 0) => {
    setVideoLoop(idle);
    videoElement = videoRef.current;
    choicesElement = choicesRef.current;

    if (videoElement) {
      videoElement.style = "";
      videoElement.style.opacity = 0;
      videoElement.style.transitionDuration = 0;

      setVideoUrl(url);
      setTimeout(() => {
        videoElement.style.opacity = 1;
        videoElement.style.transitionDuration = idle ? "1s" : "1.5s";
      }, 100);
      if (!idle) {
        AudioStreamer.stopRecording();
      }
      videoElement.play();
    }
  };

  const recordingCallback = (sttResponse) => {
    setSttResponse(sttResponse);
    let copyChatState = chatState;
    copyChatState[copyChatState.length - 1].userText = sttResponse;
    setChatState(copyChatState);
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

  const startFromBeginning = () => {
    onVideoChange("/digi_videos/starters/starter1.webm");
    setChoices(["Schedule an Appointment", "Check Symptoms", "Drug Info"]);
    setDepth(0);
    setScenario("start");
    startRecording();
  };

  const onVideoEnd = () => {
    if (isScenarioEnd) {
      startFromBeginning();
    } else {
      startRecording();
      onVideoChange("/digi_videos/idle_v1.webm", true);
    }
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
        <div className={Styles.contentContainer}>
          <div className={Styles.digiContainer}>
            <video
              className={Styles.video}
              height="700px"
              onEnded={onVideoEnd}
              src={videoUrl}
              autoPlay
              ref={videoRef}
              loop={videoLoop}
            />
          </div>
          <div className={Styles.sidePanel}>
            <div className={Styles.imgContainer}>ang</div>
            <div className={Styles.chatInterface}>
              {choices && choices.length > 0 && (
                <Choices
                  chatState={chatState}
                  setChatState={setChatState}
                  choices={choices}
                  digiSpeech={digiSpeech}
                  choicesRef={choicesRef}
                  setSttResponse={setSttResponse}
                  responseTrigger={responseTrigger}
                  setResponseTrigger={setResponseTrigger}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
