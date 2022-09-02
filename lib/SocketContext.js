import socketIOClient from 'socket.io-client';


let socket;

if (!socket) {
    socket = socketIOClient('/', { transports: ['websocket']});
    console.log('socket connect', socket)
}


export default socket;
