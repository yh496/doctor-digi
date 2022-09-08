import socket from "../lib/SocketContext";

let bufferSize = 2048,
  AudioContext,
  context,
  processor,
  input,
  globalStream;

const constraints = {
  audio: true,
  video: false,
};

let AudioStreamer = {
  createAudioContext: function () {
    context = new AudioContext();
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();
  },
  initRecording: function (onData, onTranscription, onError) {
    this.timeOut = false;
    const timer = setTimeout(() => {
      AudioStreamer.stopRecording();
      onData("start");
      clearTimeout(timer);
      this.timeOut = true;
    }, 20000);
    socket.emit("startStream");
    AudioContext = window.AudioContext || window.webkitAudioContext;
    AudioStreamer.createAudioContext();

    var handleSuccess = function (stream) {
      globalStream = stream;
      if (!context) {
        AudioStreamer.createAudioContext();
      }
      input = context.createMediaStreamSource(stream);
      input.connect(processor);

      processor.onaudioprocess = function (e) {
        microphoneProcess(e);
      };
    };

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);

    if (onData) {
      socket.on("response", (data) => {
        console.log("data from socket", data);
        onData(data);
        clearTimeout(timer);
        AudioStreamer.stopRecording();
      });
    }

    if (onTranscription) {
      socket.on("userText", (text) => {
        console.log("data from socket", text);
        onTranscription(text);
      });
    }

    socket.on("googleCloudStreamError", (error) => {
      if (onError) {
        console.log(error);
        onError("error");
      }
      // We don't want to emit another end stream event
      clearTimeout(timer);
      AudioStreamer.stopRecording();
    });
  },

  stopRecording: function () {
    socket.emit("endStream", "");
    closeAll();
  },

  timeOut: false,
};

export default AudioStreamer;

function microphoneProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  var left16 = convertFloat32ToInt16(left);

  socket.emit("getAudioData", left16);
}

function convertFloat32ToInt16(buffer) {
  let l = buffer.length;
  let buf = new Int16Array(l / 3);

  while (l--) {
    if (l % 3 === 0) {
      buf[l / 3] = buffer[l] * 0xffff;
    }
  }
  return buf.buffer;
}

function closeAll() {
  // Clear the listeners (prevents issue if opening and closing repeatedly)
  socket.off("response");
  socket.off("googleCloudStreamError");
  socket.off("getAudioData");
  let tracks = globalStream ? globalStream.getTracks() : null;
  let track = tracks ? tracks[0] : null;
  if (track) {
    track.stop();
  }

  if (processor) {
    if (input) {
      try {
        input.disconnect(processor);
      } catch (error) {
        console.warn("Attempt to disconnect input failed.");
      }
    }
    try {
      processor.disconnect(context.destination);
    } catch (error) {
      console.warn("Attempt to disconnect processor failed");
    }
  }
  context = null;
}
