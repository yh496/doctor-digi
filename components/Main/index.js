import React from "react";

import Styles from "./main.module.css";

const Main = () => {
    return (
        <div className={Styles.mainContainer}>
                <video width="960px" height="540px" src="/idle.webm" autoPlay loop muted/>
        </div>
    )

}

export default Main;