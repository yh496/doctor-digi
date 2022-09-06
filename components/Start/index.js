import Styles from "./start.module.css";

const Start = (props) => {

    const {onClick, ...rest} = props;

    return ( 
        <div className={Styles.background}>
            <div className={Styles.content}> 
                <button 
                    onClick={onClick}
                    className={Styles.startButton}
                >
                    Talk to Doctor Digi
                </button>
                <div className={Styles.info}>
                    <p>Please make sure you have permission enabled for mic access</p>
                </div>
            </div> 
        </div>
    )

};

export default Start;