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




const speechToEventMap = {
    "schedule an appointment": "appointment",
    "appointment": "appointment",
    "check symptoms": "symptom",
    "drug info": "drugInfo",
    "yes": "yes",
    "no": "no",
    "primary": "primary",
    "physician": "physician", 
    "dentist": "dentist",
    "dermatologist": "dermatologist",
    "psychiatrist": "psychiatrist", 
    "phsyiatrist": "phsyiatrist",

    "check": "symptom",
    "text": "symptom",
    "symptoms": "symptom",
    "symptom": "symptom",

    "fever": "fever",
    "weather": "fever",
    "uber": "fever",
    "gilbert":"fever",
    "Gilbert":"fever",

    "skin": "skinCut",
    "cut": "skinCut",
    "ankle": "swollenAnkle",
    "swollen": "swollenAnkle",
    "swollen ankle": "swollenAnkle"
    
} 


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
                    let sttResponse;
                    Object.keys(speechToEventMap).forEach((element) => {
                      console.log('elementtt', element,choice.toLowerCase() )
                      if (element === choice.toLowerCase()) {
                        sttResponse = speechToEventMap[element];
                      }
                    });
                    console.log('sttResponseee', sttResponse)
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
            {dialogue.userText && dialogue.userText != "default" && (<div>
                <div className={Styles.userFaceContainer}>
                  <div className={Styles.userTextContainer}>
                    <p className={Styles.textContainer}>
                      {dialogue?.choices?.find((choice) => {
                        console.log(dialogue.userText, "USER TEXT");
                        return choice.toLowerCase().includes(dialogue.userText)
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
    </div>
  );
};

export default Choices;
