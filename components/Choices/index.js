import Styles from "./choices.module.css";

const Choices = (props) => {
  const { scenario, depth, choicesRef, ...rest } = props;

  const scenarioDepthChoices = {
    0: {
      0: ["Schedule an Appointment", "Check Symptoms", "Get OTC Drug Info"],
    },
    1: {
      1: [],
    },
  };

  let choices = scenarioDepthChoices[scenario][depth];

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
