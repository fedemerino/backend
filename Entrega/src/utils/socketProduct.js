const socketProduct = (io) => {
    io.on('connection', async (socket) => {
        console.log('New client connected')
    })
}

module.exports = {
    socketProduct
}