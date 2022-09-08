export const getNextResponse = ({ scenario, depth, response }) => {
  if (scenario === "appointment" && (depth === 1 || depth === 2)) {
    response = "default";
  }
  let randomError = ["error1", "error2", "error3"].sample();
  return (
    nextResponseMap?.[scenario]?.[depth]?.[response] ||
    nextResponseMap.error[randomError]
  );
};

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const nextResponseMap = {
  error: {
    error1: {
      video: "/digi_videos/errors/error1.webm",
      speech:
        "Sorry, I couldn't understand what you were saying. Could you please repeat it?",
    },
    error2: {
      video: "/digi_videos/errors/error2.webm",
      speech: "Sorry, I didn't catch that. Could you please repeat yourself?",
    },
    error3: {
      video: "/digi_videos/errors/error3.webm",
      speech:
        "Sorry, I couldn't hear you clearly. Could you speak a bit louder?",
    },
  },
  reset: {
    0: {
      default: {
        nextScenario: "start",
        nextDepth: 0,
        video: "digi_videos/starters/starter1.webm",
        nextChoices: ["Schedule an Appointment", "Check Symptoms", "Drug Info"],
      },
    },
  },
  start: {
    0: {
      appointment: {
        speech: "Sure, have you made an appointment with me before?",
        nextScenario: "appointment",
        nextDepth: 1,
        video: "/digi_videos/scenario1/depth0.webm",
        nextChoices: ["Yes", "No"],
      },
      symptom: {},
      drugInfo: {},
    },
  },
  appointment: {
    1: {
      default: {
        speech: "Can I have your name please?",
        nextScenario: "appointment",
        nextDepth: 2,
        video: "/digi_videos/scenario1/depth1.webm",
        nextChoices: [],
      },
    },
    2: {
      default: {
        speech:
          "Thank you. Which type of doctor do you want to make an appointment with?",
        nextScenario: "appointment",
        nextDepth: 3,
        video: "/digi_videos/scenario1/depth2.webm",
        nextChoices: [
          "Primary Care Physician",
          "Dentist",
          "Dermatologist",
          "Psychiatrist",
          "Physiatrist",
        ],
      },
    },
    3: {
      default: {
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3.webm",
        nextChoices: ["Yes", "No"],
      },
      dentist: {
        speech:
          "I see. I am looking into available slots for a nearby dental clinic. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_dentist.webm",
        nextChoices: ["Yes", "No"],
      },
      dermatologist: {
        speech:
          "I see. I am looking into available slots for a nearby dermatologist clinic. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_dermatologist.webm",
        nextChoices: ["Yes", "No"],
      },
      phsyiatrist: {
        speech:
          "I see. I am looking into available slots for a nearby phsyiatrist clinic. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_phsyiatrist.webm",
        nextChoices: ["Yes", "No"],
      },
      psychiatrist: {
        speech:
          "I see. I am looking into available slots for a nearby psychiatry. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_psychiatrist.webm",
        nextChoices: ["Yes", "No"],
      },
      primary: {
        speech:
          "I see. I am looking into available slots for your primary care physician. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_primary.webm",
        nextChoices: ["Yes", "No"],
      },
    },
    4: {
      yes: {
        nextScenario: "start",
        nextDepth: 0,
        video: "/digi_videos/scenario1/depth4_yes.webm",
        nextChoices: [],
        isEnd: true,
      },
      no: {
        nextScenario: "appointment",
        nextDepth: 5,
        video: "/digi_videos/scenario1/depth4_no.webm",
        nextChoices: ["Yes", "No"],
      },
    },
    5: {
      yes: {
        nextScenario: "start",
        nextDepth: 0,
        video: "/digi_videos/scenario1/depth5_yes.webm",
        nextChoices: [],
        isEnd: true,
      },
      no: {
        nextScenario: "start",
        nextDepth: 0,
        video: "/digi_videos/scenario1/depth5_no.webm",
        nextChoices: [],
        isEnd: true,
      },
    },
  },
};

export default { getNextResponse };
