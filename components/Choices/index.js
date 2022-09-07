import Styles from "./choices.module.css";
import React, { useState, useEffect, useRef } from "react";

import AudioStreamer from "../../lib/AudioHandler";

const Choices = (props) => {
  const {
    setHelpText,
    setRecording, 
    choices,
    chatState,
    setChatState,
    choicesRef,
    digiSpeech,
    setSttResponse,
    responseTrigger,
    setResponseTrigger,
    ...rest
  } = props;

  const dialogue = {
    digi: digiSpeech,
  };

  const speechToEventMap = [
    "appointment",
    "yes",
    "no",
    "primary",
    "physician",
    "dentist",
    "dermatologist",
    "psychiatrist",
    "phsyiatrist",
  ];

  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <div className={Styles.scroll}>
      <div className={Styles.mainContainer} ref={choicesRef}>
        {chatState.map((dialogue, idx) => (
          <>
            <div className={Styles.digiContainer}>
              <img
                className={Styles.digiImage}
                width={60}
                height={60}
                src="./digi_face.png"
              />
              <div className={Styles.digiSpeechContainer}>
                <p key={idx} style={{ textAlign: "left", marginBottom: 0 }}>
                  {dialogue.aiText}
                </p>
              </div>
            </div>
            <div className={Styles.choiceContainer}>
              {dialogue?.choices?.map((choice, idx) => (
                <button
                  className={Styles.choiceButton}
                  key={idx}
                  onClick={() => {
                    setSelectedChoice(choice);
                    let sttResponse = speechToEventMap.find((element) => {
                      if (choice.toLowerCase().includes(element)) {
                        return element;
                      }
                    });
                    setSttResponse(sttResponse);
                    let copyChatState = chatState;
                    copyChatState[copyChatState.length - 1].userText =
                      sttResponse;
                    setChatState(copyChatState);
                    setResponseTrigger(!responseTrigger);
                    setRecording(false)
                    AudioStreamer.stopRecording();
                    setHelpText(sttResponse)
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
            <div>
              {dialogue.userText && (
                <div className={Styles.userFaceContainer}>
                  <div className={Styles.userTextContainer}>
                    <p className={Styles.textContainer}>{dialogue.userText}</p>
                  </div>
                  <img
                    className={Styles.userImage}
                    width={60}
                    height={60}
                    src="./user_face.png"
                  />
                </div>
              )}
            </div>
          </>
        ))}

        {/* {selectedChoice ? (
        <div className={Styles.choiceContainer}>
          <p>{selectedChoice}</p>
          <img
            className={Styles.userImage}
            width={60}
            height={60}
            src="./user_face.png"
          />
        </div>
      ) : (
        <div />
      )} */}
      </div>
    </div>
  );
};

export default Choices;
