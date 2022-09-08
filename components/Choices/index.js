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

  let messagesEnd = undefined;

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

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
                    setRecording(false);
                    AudioStreamer.stopRecording();
                    setHelpText(sttResponse);
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
            <div>
              {dialogue.userText &&
                dialogue.userText != "start" &&
                dialogue.userText != "default" && (
                  <div className={Styles.userFaceContainer}>
                    <div className={Styles.userTextContainer}>
                      <p className={Styles.textContainer}>
                        {dialogue?.choices?.find((choice) => {
                          console.log(dialogue.userText, "USER TEXT");
                          return choice
                            .toLowerCase()
                            .includes(dialogue.userText)
                            ? choice
                            : "";
                        })}
                      </p>
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

        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
      </div>
    </div>
  );
};

export default Choices;
