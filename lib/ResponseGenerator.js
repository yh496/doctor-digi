export const getNextResponse = ({ scenario, depth, response }) => {

    console.log('scenario, depth, response', scenario, depth, response)
    if (scenario === "appointment" && (depth === 1 || depth === 2)) {
        response = "default"
    }

    if (scenario === "symptom" && (depth === 2.1 || depth === 2.2)) {
        response = digitEvent
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
      symptom: {
        speech: "Absolutely. What are your symptoms in the past week?",
        nextScenario: "symptom",
        nextDepth: 1,
        video: "/digi_videos/scenario2/depth0.webm",
        nextChoices: ["Skin Cut", "Fever", "Swollen Ankle"],
      },
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
        speech:
        "I see. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_default.webm",
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
      physiatrist: {
        speech:
          "I see. I am looking into available slots for a nearby physiatrist clinic. Do you need urgent care?",
        nextScenario: "appointment",
        nextDepth: 4,
        video: "/digi_videos/scenario1/depth3_physiatrist.webm",
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
  symptom: {
    1: {
        fever: {
            speech: "How high is your fever in Fahrenheit? ",
            nextScenario: "symptom",
            nextDepth: 2.1,
            video: "/digi_videos/scenario2/depth1_fever.webm",
            nextChoices: [],
        },
        skinCut: {
            speech: "Try to drink 8 to 10 glasses of water per day, and elevate your feet, preferably above your heart. Consider taking ibuprofen, naproxen, or acetaminophen if pain persists.",
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth1_skin_rash.webm",
            nextChoices: [],
            isEnd: true,
        },
        swollenAnkle: {
            speech: "Could you describe your pain on a scale of 1 to 10, with 1 being least painful and 10 being most painful?",
            nextScenario: "symptom",
            nextDepth: 2.2,
            video: "/digi_videos/scenario2/depth1_swollen_ankle.webm",
            nextChoices: [],
        }
    },
    2.1: {
        normal: {
            speech: "Your body temperature seems to be in the normal range. However, if you are feeling ill, be sure to continuously check the temperature for the next three days and make sure you drink a lot of water.",
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth2_fever_normal.webm",
            nextChoices: [],
            isEnd: true 
        },
        high: {
            speech: "Based on your current symptoms, we recommend you to take acetaminophen and ibuprofen. One popular OTC medicines for acetaminophen is Tylenol. One popular OTC medicines for ibuprofen is Advil.",
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth2_fever_high.webm",
            nextChoices: [],
            isEnd: true 
        }
    },
    2.2: {
        low: {
            speech: "Try to drink 8 to 10 glasses of water per day, and elevate your feet, preferably above your heart. Consider taking ibuprofen, naproxen, or acetaminophen if pain persists.",
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth2_swollen_ankle_low.webm",
            nextChoices: [],
            isEnd: true 
        },
        mid: {
            speech: "Try to drink 8 to 10 glasses of water per day, and elevate your feet, preferably above your heart. Consider taking ibuprofen, naproxen, or acetaminophen if pain persists.",
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth2_swollen_ankle_mid.webm",
            nextChoices: [],
            isEnd: true 
        },
        high: {
            speech: "I recommend taking Nonsteroidal anti-inflammatory drugs (NSAIDs) such as ibuprofen or naproxen. Acetaminophen might also fight pain", 
            nextScenario: "start",
            nextDepth: 0,
            video: "/digi_videos/scenario2/depth2_swollen_ankle_mid.webm",
            nextChoices: [],
            isEnd: true 
        }
    }
  }
};

export default { getNextResponse };
