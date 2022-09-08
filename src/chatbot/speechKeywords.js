
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

    "drug": "drugInfo",
    "info": "drugInfo",

    "dose": "dosage",
    "usage": "dosage",
    "dosage": "dosage",
    "daily": "dosage",

    "general": "generalInfo",
    "interactions":"interaction",
    "interaction": "interaction",

    "advil": "advil",
    "allegra": "allegra",
    
    
} 

module.exports = speechToEventMap