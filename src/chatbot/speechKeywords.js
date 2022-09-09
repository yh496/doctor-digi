
const speechToEventMap = {
    "appointment": "appointment",
    "yes": "yes",
    "no": "no",
    "yeah": "yes",
    "yep": "yes",
    "nope": "no",
    "nah": "no",
    "primary": "primary",
    "physician": "primary", 
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

    "Advil": "advil",
    "advil": "advil",
    "Allegra": "allegra",
    "allegra": "allegra",
    
    
} 

module.exports = speechToEventMap