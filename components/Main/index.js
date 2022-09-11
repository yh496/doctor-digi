import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";

import Start from "../Start";
import Choices from "../Choices";

import { getNextResponse } from "../../lib/ResponseGenerator";

import AudioStreamer from "../../lib/AudioHandler";

import speechToEventMap from "../../lib/SpeechKeywords";


const Main = () => {
  const videoRef = useRef();
  const choicesRef = useRef();
  let videoElement = videoRef.current;
  let choicesElement = choicesRef.current;

  const [startDigi, setStartDigi] = useState(false);

  const [responseTrigger, setResponseTrigger] = useState(false);
  const [isScenarioEnd, setIsScenarioEnd] = useState(false);
  const [isOff, setIsOff] = useState(false);

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

  const turnOffDigi = () => {
    setIsOff(false);
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


  useEffect(() => {
    if (sttResponse) {
      const { nextScenario, nextDepth, video, nextChoices, isEnd, isOff, speech } =
        getNextResponse({
          scenario,
          depth,
          response: sttResponse,
          digitEvent,
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
      setIsOff(isOff)
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
      turnOffDigi();
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

  const getEvent = (transcript) => {
    for (const [key, value] of Object.entries(speechToEventMap)) {
      const regex = new RegExp(key,"g")
      if (transcript.toLowerCase().match(regex)) {
        return value
      }
    } 
    return "default"
  }

  function digitRecognition(speech) {
    let digit = parseFloat(speech.match(/[\d\.]+/));
    console.log('digit1', digit)
  
    if (digit === 1|| digit === 2 || digit === 3) {
      return "low"
    }
    if (digit === 4|| digit === 5 || digit === 6) {
      return "mid"
    }
    if (digit === 7|| digit === 8 || digit === 9) {
      return "high"
    }
    if (digit < 98.9) { 
      return "normal"
    }
    if (digit >= 98.9) { 
      return "high"
    }
  
    return null
  
  }

  const onSpeechFinal = (transcript) => {
    const event = getEvent(transcript);
    const digitEvent = digitRecognition(transcript)
    setDigitEvent(digitEvent)

    setSttResponse(event);
    let copyChatState = chatState;
    copyChatState[copyChatState.length - 1].userText = event ?? transcript;
    setChatState(copyChatState);

    console.log('hell,loo',copyChatState)
    setResponseTrigger(!responseTrigger);
    setRecording(false);
    if (socketRef.current !== null) {
      socketRef.current.close()
    }   

  }

  const socketRef = useRef(null);
    
  const activateMicrophone = ( ) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          setRecording(true);
          const mediaRecorder = new MediaRecorder(stream)
          const socket = new WebSocket(`${window.location.origin.replace("https","wss").replace("http", "ws")}`)

          socket.onopen = () => {
              console.log({ event: 'onopen' })
              mediaRecorder.addEventListener('dataavailable', async (event) => {
                  if (event.data.size > 0 && socket.readyState === 1) {
                      socket.send(event.data)
                  }
              })
              mediaRecorder.start(1000)
          }

          socket.onmessage = (message) => {
              const received = JSON.parse(message.data)
              const transcript = received.channel.alternatives[0].transcript
              if (transcript) {
                setHelpText(transcript)
              }
              if (received.speech_final) {
                  console.log('transcriptttranscript', received.speech_final)
                  onSpeechFinal(transcript)
                  // recordingCallback(transcript);
                  // onTranscription(transcript)
              }
          }

          socket.onclose = () => {
              console.log({ event: 'onclose' })
          }

          socket.onerror = (error) => {
              console.log({ event: 'onerror', error })
          }

          socketRef.current = socket
      })    

      
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
    } else if (isOff) {
      turnOffDigi();
    }else {
      activateMicrophone();
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
      
                  width="150%"
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
                    recording={recording}
                    helpText={helpText}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
