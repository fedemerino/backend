const socketProductManager = require('../daos/ProductManager')
const socketProducts = new socketProductManager('../src/products.json')

const socketProduct = (io) => {
    io.on('connection', async (socket) => {
        console.log('New client connected')
        socket.emit('products', await socketProducts.getProducts())
    })
}

module.exports = {
    socketProduct
}