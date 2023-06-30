const { deleteProductFromCart, deleteCart, modifyCart, createCart, getCartById, getCarts } = require('../controllers/carts.controller')
const RouterClass = require('./customRouter')

class CartsRouter extends RouterClass {
    init() {
        this.get('/', getCarts)
        this.get('/:cid', getCartById)
        this.post('/', createCart)
        this.put('/:cid/product/:pid', modifyCart)
        this.delete('/:cid/product/:pid', deleteProductFromCart)
        this.delete('/:cid', deleteCart)
    }
}

module.exports = new CartsRouter()