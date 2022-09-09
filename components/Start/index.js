import Styles from "./start.module.css";

const Start = (props) => {

    const {onClick, ...rest} = props;

    return ( 
        <div className={Styles.background}>
       
            <div className={Styles.content}> 
                <div className={Styles.logoContainer}>
                    <img style={{opacity: 0.8}} src="/digi_logo.png"/>
                </div>
                <button 
                    onClick={onClick}
                    className={Styles.startButton}
                >
                    Get Started
                </button>
                <div className={Styles.info}>
                    <p>Please make sure you have permission enabled for mic access</p>
                </div>
            </div> 
        </div>
    )

};

export default Start;