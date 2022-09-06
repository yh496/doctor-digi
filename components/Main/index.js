import React, { useState, useEffect, useRef } from "react";

import Styles from "./main.module.css";
import RecordAudio from "../RecordAudio";

import Start from "../Start";
import Choices from "../Choices"; 

const Main = () => {

  const [startDigi, setStartDigi] = useState(false)

  return (
    <div className={Styles.mainContainer}>
      {!startDigi ? 
        <Start onClick={() => {setStartDigi(true)}}/>
        :
      
      <div className={Styles.digiContainer}> 
        <video
          className={Styles.video}
          width="960px"
          height="540px"
          src="/digi_videos/starters/starter1.webm"
          autoPlay          
        />
        <Choices scenario={0} depth={0}/>
      </div>
    }

     
    </div>
  );
};

export default Main;
