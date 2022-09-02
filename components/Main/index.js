import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";

const Main = () => {
  return (
    <div className={Styles.mainContainer}>
      <video
        width="960px"
        height="540px"
        src="/idle.webm"
        autoPlay
        loop
        muted
      />
      <RecordAudio />
    </div>
  );
};

export default Main;
