import Styles from "./choices.module.css";

const Choices = (props) => {
  const { choices, choicesRef, ...rest } = props;

  return (
    <div className={Styles.choiceContainer} ref={choicesRef}>
      {choices?.map((x, idx) => (
        <p style={{ textAlign: "center" }} key={idx}>
          {x}
        </p>
      ))}
    </div>
  );
};

export default Choices;
