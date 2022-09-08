import Styles from "./choices.module.css";
import React, { useState, useEffect, useRef } from "react";

import AudioStreamer from "../../lib/AudioHandler";
import { AiTwotoneAudio } from "react-icons/ai";

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
    ...rest
  } = props;

  const speechToEventMap = {
    "schedule an appointment": "appointment",
    appointment: "appointment",
    "check symptoms": "symptom",
    "drug info": "drugInfo",
    yes: "yes",
    no: "no",
    primary: "primary",
    "primary care physician": "primary",

    physician: "physician",
    dentist: "dentist",
    dermatologist: "dermatologist",
    psychiatrist: "psychiatrist",
    phsyiatrist: "phsyiatrist",

    check: "symptom",
    text: "symptom",
    symptoms: "symptom",
    symptom: "symptom",

    fever: "fever",
    weather: "fever",
    uber: "fever",
    gilbert: "fever",
    Gilbert: "fever",

    skin: "skinCut",
    cut: "skinCut",
    ankle: "swollenAnkle",
    swollen: "swollenAnkle",
    "swollen ankle": "swollenAnkle",
    drug: "drugInfo",
    info: "drugInfo",

    dose: "dosage",
    usage: "dosage",
    dosage: "dosage",
    daily: "dosage",
    "daily dose limit": "dosage",

    general: "generalInfo",
    "general information": "generalInfo",
    "drug info": "drugInfo",
    interactions: "interaction",
    interaction: "interaction",

    advil: "advil",
    allegra: "allegra",

    "skin cut": "skinCut",
  };

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
              {dialogue?.choices?.map((choice, idx) => (
                <button
                  className={Styles.choiceButton}
                  key={idx}
                  onClick={() => {
                    let sttResponse;
                    let userText;
                    Object.keys(speechToEventMap).forEach((element) => {
                      if (element === choice.toLowerCase()) {
                        sttResponse = speechToEventMap[element];
                        userText = element;
                      }
                    });
                    setSttResponse(sttResponse);
                    let copyChatState = chatState;
                    copyChatState[copyChatState.length - 1].userText = userText;
                    setChatState(copyChatState);
                    setResponseTrigger(!responseTrigger);
                    setRecording(false);
                    AudioStreamer.stopRecording();
                    setHelpText(sttResponse);
                    AudioStreamer.timeOut = false;
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
            {dialogue.userText && dialogue.userText != "default" && (
              <div>
                <div className={Styles.userFaceContainer}>
                  <div className={Styles.userTextContainer}>
                    <p className={Styles.textContainer}>
                      {dialogue?.choices?.find((choice) => {
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
