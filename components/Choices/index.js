import Styles from "./choices.module.css";
import React, { useState, useEffect, useRef } from "react";

import { AiTwotoneAudio } from "react-icons/ai";
import speechToEventMap from "../../lib/SpeechKeywords";

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
    recording,
    helpText,
    socketRef,
    ...rest
  } = props;




  let messagesEnd = undefined;

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });


  const findResponse = (choices, userText) => {
    let chatResponse = userText
    if (choices?.length > 0) { 
      choices?.map((choice, i) => {
        if (speechToEventMap[choice]) {
          chatResponse = speechToEventMap[choice.toLowerCase().replace(/ /g, "")].label
        }
      })
    }
    return chatResponse
  }

  return (
    <div className={Styles.scroll}>
      <div className={Styles.mainContainer} ref={choicesRef}>
        <div className={Styles.digiContainer}>
              <div className={Styles.digiImageContainer}>
                <img src="./digi_face.png" />
              </div>
              <div className={Styles.digiSpeechContainer}>
                <p style={{  textAlign: "left", marginBottom: 0 }}>
                  Please speak into the mic when the icon in the bottom of this chatbox turns red! 
                  
                </p>
                <div style={{display: "flex", flexDirection: "column"}}> 
                  <div style={{display: "flex", flexDirection: "row",marginTop: "10px"}}> 
                  <AiTwotoneAudio
                      style={{
                        color: "black",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                    <span style={{fontWeight:600}}>:Dr. DiGi is speaking </span> 
                    </div>
                    <div style={{display: "flex", flexDirection: "row", marginTop: "10px"}}> 
                    <AiTwotoneAudio
                      style={{
                        color: "red",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                    <span style={{fontWeight:600}}>:Recording your voice </span> 
                    </div>
                </div>
              </div>
            </div>
        {chatState.map((dialogue, idx) => (
          <>
            <div className={Styles.digiContainer}>
              <div className={Styles.digiImageContainer}>
                <img src="./digi_face.png" />
              </div>
              <div className={Styles.digiSpeechContainer}>
                <p key={idx} style={{ textAlign: "left", marginBottom: 0 }}>
                  {dialogue.aiText}
                </p>
              </div>
            </div>
            <div className={Styles.choiceContainer}>
              {!dialogue.aiText.startsWith("Great! I hope you feel better") &&
                dialogue?.choices?.map((choice, idx) => (
                  <button
                    className={Styles.choiceButton}
                    key={idx}
                    onClick={() => {
                      let sttResponse;
                      let userText;
                      Object.keys(speechToEventMap).forEach((element) => {
                        if (element === choice.toLowerCase()) {
                          sttResponse = speechToEventMap[element].event;
                          userText = speechToEventMap[element].label;
                        }
                      });
                      setSttResponse(sttResponse);
                      let copyChatState = chatState;
                      copyChatState[copyChatState.length - 1].userText =
                        userText;
                      setChatState(copyChatState);
                      setResponseTrigger(!responseTrigger);
                      setRecording(false);
                      setHelpText(sttResponse);
                      if (socketRef.current !== null) {
                        socketRef.current.close()
                      }   
                    }}
                    disabled={
                      chatState.indexOf(dialogue) == chatState.length - 1
                        ? false
                        : true
                    }
                  >
                    {choice}
                  </button>
                ))}
            </div>
            {dialogue.userText && dialogue.userText !== "default" && (
              <div>
                <div className={Styles.userFaceContainer}>
                  <div className={Styles.userTextContainer}>
                    <p className={Styles.textContainer}>
                      {findResponse(dialogue.choices, dialogue.userText)}
                    </p>
                  </div>
                  <img
                    className={Styles.userImage}
                    width={60}
                    height={60}
                    src="./user_face.png"
                  />
                </div>
              </div>
            )}
          </>
        ))}

        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
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
    </div>
  );
};

export default Choices;
