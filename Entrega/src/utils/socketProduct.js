const socketProduct = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected')
        socket.emit('products', [])
    })
}

module.exports = {
    socketProduct
}