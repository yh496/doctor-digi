import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";

const Main = () => {
  return (
    <div className={Styles.mainContainer}>
      <video
        width="960px"
        height="540px"
        src="/digi_videos/scenario1/depth1.webm"
        autoPlay
        loop
      />
      <RecordAudio />
    </div>
  );
};

export default Main;
