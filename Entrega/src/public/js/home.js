console.log('Socket Home')
const socket = io()
socket.on('message', 'home')
