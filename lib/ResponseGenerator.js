

export const getNextResponse = ({scenario, depth, response}) => {
    console.log('response', scenario, depth, response)
    if (scenario === "appointment" && (depth === 1 || depth === 2 || depth === 3)) {
        response = "default"
    }
    return nextResponseMap?.[scenario]?.[depth]?.[response] || "/digi_videos/scenario1/depth0.webm"
};

const nextResponseMap = {
    start: {
        0: {
            appointment: {nextScenario: "appointment", nextDepth: 1, video: "/digi_videos/scenario1/depth0.webm"},
            symptom: {},
            drugInfo: {},
        }
    },
    appointment: {
        1: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 2, 
                video: "/digi_videos/scenario1/depth1.webm"
            }
        },
        2: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 3, 
                video: "/digi_videos/scenario1/depth2.webm"
            }
        },
        3: {
            default: {
                nextScenario: "appointment", 
                nextDepth: 4, 
                video: "/digi_videos/scenario1/depth3.webm"
            }
        },
        4: {
            yes: {
                nextScenario: "start", 
                nextDepth: 0, 
                video: "/digi_videos/scenario1/depth4_yes.webm"
            },
            no: {
                nextScenario: "appointment", 
                nextDepth: 5, 
                video: "/digi_videos/scenario1/depth4_no.webm"
            }
        },
        5: { 
            yes: {
                nextScenario: "start", 
                nextDepth: 0, 
                video: "/digi_videos/scenario1/depth5_yes.webm"
            },
            no: {
                nextScenario: "start", 
                nextDepth: 0, 
                video: "/digi_videos/scenario1/depth5_no.webm"
            }
        }
    }
}
export default {getNextResponse};