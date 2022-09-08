
const speechToEventMap = {
    "appointment": "appointment",
    "yes": "yes",
    "no": "no",
    "primary": "primary",
    "physician": "physician", 
    "dentist": "dentist",
    "dermatologist": "dermatologist",
    "psychiatrist": "psychiatrist", 
    "physiatrist": "physiatrist",

    "check": "symptom",
    "text": "symptom",
    "symptoms": "symptom",
    "symptom": "symptom",

    "fever": "fever",
    "weather": "fever",
    "uber": "fever",
    "gilbert":"fever",
    "Gilbert":"fever",

    "skin": "skinCut",
    "cut": "skinCut",
    "ankle": "swollenAnkle",
    "swollen": "swollenAnkle",
    
} 

module.exports = speechToEventMap