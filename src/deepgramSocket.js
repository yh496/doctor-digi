
// Add Deepgram so you can get the transcription
const { Deepgram } = require('@deepgram/sdk')
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY)
const boost = require("./chatbot/boost");

// Add WebSocket
const  {WebSocketServer} = require('ws')

module.exports = function (server) {
    const wss = new WebSocketServer({server})
    wss.on('connection', (ws) => {
        const deepgramLive = deepgram.transcription.live({
            interim_results: true,
            punctuate: true,
            endpointing: true,
            vad_turnoff: 500,
            numerals: true,
            keywords: boost
        })
    
        deepgramLive.addListener('open', () => console.log('dg onopen'))
        deepgramLive.addListener('error', (error) => console.log({ error }))
    
        ws.onmessage = (event) => deepgramLive.send(event.data)
        ws.onclose = () => deepgramLive.finish()
    
        deepgramLive.addListener('transcriptReceived', (data) => ws.send(data))
    })
}
// Open WebSocket connection and initiate live transcription

