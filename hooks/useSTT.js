import {useEffect} from "react";
import { Deepgram } from ("@deepgram/sdk");

const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);


const useSTT = () => {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: 'audio/webm',
            });
            const deepgramSocket = deepgram.transcription.live({ punctuate: true });
          
            deepgramSocket.addListener('open', () => {
              mediaRecorder.addEventListener('dataavailable', async (event) => {
                if (event.data.size > 0 && deepgramSocket.readyState == 1) {
                  deepgramSocket.send(event.data)
                }
              })
              mediaRecorder.start(15000)
            });
          
            deepgramSocket.addListener("transcriptReceived", (received) => {
              const transcript = received.channel.alternatives[0].transcript;
              if (transcript && received.is_final) {
                console.log(transcript);
              }
            });
          });
    },[])
    

};

export default useSTT;