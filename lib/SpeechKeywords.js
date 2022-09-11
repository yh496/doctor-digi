
const speechToEventMap = {
    "appointment": "appointment",
    "yes": "yes",
    "no": "no",
    "yeah": "yes",
    "yep": "yes",
    "Yes": "yes",
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

    "dose": "dosage",
    "usage": "dosage",
    "dosage": "dosage",
    "daily": "dosage",
    "limit": "dosage",

    "general": "generalInfo",
    "general information": "generalInfo",
    "interactions":"interaction",
    "interaction": "interaction",

    "Advil": "advil",
    "advil": "advil",
    "Allegra": "allegra",
    "allegra": "allegra",
    "all":"allegra",
    
    
} 

export default speechToEventMap;