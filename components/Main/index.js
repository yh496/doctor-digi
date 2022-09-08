import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";

import Start from "../Start";
import Choices from "../Choices";

import { getNextResponse } from "../../lib/ResponseGenerator";

import AudioStreamer from "../../lib/AudioHandler";

import { AiTwotoneAudio } from "react-icons/ai";

import { ConsoleSqlOutlined } from "@ant-design/icons";

const Main = () => {
  const videoRef = useRef();
  const choicesRef = useRef();
  let videoElement = videoRef.current;
  let choicesElement = choicesRef.current;

  const [startDigi, setStartDigi] = useState(false);

  const [responseTrigger, setResponseTrigger] = useState(false);
  const [isScenarioEnd, setIsScenarioEnd] = useState(false);
  const [recording, setRecording] = useState(false);

  const [isAISpeaking, setIsAISpeaking] = useState(true);

  const [scenario, setScenario] = useState("start");
  const [depth, setDepth] = useState(0);

  const [digitEvent, setDigitEvent] = useState("")

  const [helpText, setHelpText] = useState("");

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
          digitEvent
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

  useEffect(() => {
    if (AudioStreamer.timeOut) {
      setStartDigi(false);
      setVideoUrl("/digi_videos/starters/starter1.webm");
      setScenario("start");
      setDepth(0);
      setChoices(["Schedule an Appointment", "Check Symptoms", "Drug Info"]);
      setChatState([
        {
          aiText: "Hello! What can I help you with today?",
          choices: ["Schedule an Appointment", "Check Symptoms", "Drug Info"],
          userText: "",
        },
      ]);
    }
  }, [videoLoop]);

  const onVideoChange = (url, idle = 0) => {
    setVideoLoop(idle);
    setIsAISpeaking(true);
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

      videoElement.play();
    }
  };

  const recordingCallback = (sttResponse) => {
    setSttResponse(sttResponse);
    let copyChatState = chatState;
    copyChatState[copyChatState.length - 1].userText = sttResponse;
    setChatState(copyChatState);
    setResponseTrigger(!responseTrigger);
    setRecording(false);
  };

  const onTranscription = (text) => {
    setHelpText(text);
  };

  const onDigit = (event) => {
    console.log('digitEventttt', event)
    setDigitEvent(event)
  }

  function startRecording() {
    console.log("audio start recording...", scenario);
    setRecording(true);
    setHelpText("Speak to Dr. Digi ...");
    AudioStreamer.initRecording(recordingCallback, onTranscription, onDigit, (error) => {
      console.error("Error when recording", error);
    });
  }

  const startFromBeginning = () => {
    setDepth(0);
    setScenario("reset");
    setSttResponse("default");
    setResponseTrigger(!responseTrigger);
  };

  const onVideoEnd = () => {
    setIsAISpeaking(false);
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
        <>
          <div className={Styles.upper}>
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
                <div className={Styles.chatInterface}>
                  <Choices
                    setHelpText={setHelpText}
                    setRecording={setRecording}
                    chatState={chatState}
                    setChatState={setChatState}
                    choices={choices}
                    digiSpeech={digiSpeech}
                    choicesRef={choicesRef}
                    setSttResponse={setSttResponse}
                    responseTrigger={responseTrigger}
                    setResponseTrigger={setResponseTrigger}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.lower}>
            <div className={Styles.recordInterface}>
              <AiTwotoneAudio
                style={{
                  color: recording ? "red" : "black",
                  height: "30px",
                  width: "30px",
                }}
              />
            </div>
            <div className={Styles.helpText}>{helpText}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
