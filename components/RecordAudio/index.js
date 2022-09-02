import React, { useState, useEffect, useRef } from "react";
import AudioStreamer from "../../lib/AudioHandler";

const RecordAudio = () => {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState();
  const audioRef = React.useRef();
  let audioElement = audioRef.current;

  const startRecording = () => {
    console.log("audio start recording...");
    setRecording(true);
    AudioStreamer.initRecording(recordingCallback, (error) => {
      console.error("Error when recording", error);
      setRecording(false);
    });
  };

  const stopRecording = () => {
    setRecording(false);
    AudioStreamer.stopRecording();
  };

  const recordingCallback = (data) => {
    // const { video, image, choices, audio } = generateResponse(data, scenario);
    stop();
    if (audio) {
      setAudio(audio);
      audioElement = audioRef.current;
      audioElement?.play();
    } else {
      audioElement = audioRef.current;
      audioElement?.pause();
    }

    // if (
    //   video === "./gas_1.webm" ||
    //   video === "./leave_1.webm" ||
    //   video === "./weather_1.webm" ||
    //   video === "./gas_3.webm"
    // ) {
    //   setMoveAI(false);
    //   const deviceWidth =
    //     window.innerWidth > 0 ? window.innerWidth : screen.width;
    //   videoElement = videoRef.current;
    //   if (videoElement) {
    //     videoElement.style.transform = `translate3d(${
    //       deviceWidth * 0.4
    //     }px, 0, 0)`;
    //   }
    //   if (video === "./weather_1.webm") {
    //     rainImageElement = rainImageRef.current;
    //     rainImageElement.style.display = "block";
    //   } else if (video === "./gas_1.webm") {
    //     carImageElement = carImageRef.current;
    //     carImageElement.style.display = "block";
    //   } else if (video === "./gas_3.webm") {
    //     receiptImageElement = receiptImageRef.current;
    //     receiptImageElement.style.display = "block";
    //   }
    // } else {
    // }
  };

  return (
    <div>
      <button width="400px" height="100px" onClick={startRecording}>
        Start Record
      </button>
      <button width="400px" height="100px" onClick={stopRecording}>
        Stop Record
      </button>
    </div>
  );
};

export default RecordAudio;
