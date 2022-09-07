

export const getNextResponse = ({scenario, depth, response}) => {
    if (scenario === "appointment" && (depth === 1 || depth === 2)) {
        response = "default"
    }
    return nextResponseMap?.[scenario]?.[depth]?.[response] || nextResponseMap.error()
};

const selectRandom = (videos) => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    return randomVideo
}

const nextResponseMap = {
    error: function () {
        const randomVideo = selectRandom(["/digi_videos/errors/error1.webm", "/digi_videos/errors/error2.webm", "/digi_videos/errors/error3.webm"])
        return {video: randomVideo}
    },
    start: {
        0: {
            appointment: {
                nextScenario: "appointment", 
                nextDepth: 1, 
                video: "/digi_videos/scenario1/depth0.webm",
                nextChoices: ["Yes", "No"]
            },
            symptom: {},
            drugInfo: {},
        }
    },
    appointment: {
        1: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 2, 
                video: "/digi_videos/scenario1/depth1.webm",
                nextChoices: []
            }
        },
        2: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 3, 
                video: "/digi_videos/scenario1/depth2.webm",
                nextChoices: ["Primary Care Physician", "Dentist", "Dermatologist", "Psychiatrist", "Physiatrist"]
            }
        },
        3: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3.webm",
                nextChoices: ["Yes", "No"]
            },
            dentist: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3_dentist.webm",
                nextChoices: ["Yes", "No"]

            },
            dermatologist: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3_dermatologist.webm",
                nextChoices: ["Yes", "No"]

            },
            phsyiatrist: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3_phsyiatrist.webm",
                nextChoices: ["Yes", "No"]

            },
            psychiatrist: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3_psychiatrist.webm",
                nextChoices: ["Yes", "No"]

            },
            primary: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3_primary.webm",
                nextChoices: ["Yes", "No"]
            }
        },
        4: {
            yes: {
                nextScenario: "start", 
                nextDepth: 0, 
                video: "/digi_videos/scenario1/depth4_yes.webm",
                nextChoices: [],
                isEnd: true
            },
            no: {
                nextScenario: "appointment", 
                nextDepth: 5, 
                video: "/digi_videos/scenario1/depth4_no.webm",
                nextChoices: ["Yes", "No"]
            }
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
                isEnd: true
            }
        },
    }
}



export default {getNextResponse};