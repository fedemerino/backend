const { deleteProductFromCart, deleteCart, modifyCart, createCart, getCartById, getCartByUsername, getCarts, createTicket } = require('../controllers/carts.controller')
const RouterClass = require('./customRouter')
const authorization = require('../passport-jwt/authorizationRole')
const passportCall = require('../passport-jwt/passportCall')
class CartsRouter extends RouterClass {
    init() {
        this.get('/', getCarts)
        this.post('/', createCart)
        this.get('/:cid', getCartById)
        this.get('/user/:username', getCartByUsername)
        this.delete('/:cid', deleteCart)
        this.put('/:cid/product/:pid', modifyCart)
        this.delete('/:cid/product/:pid', deleteProductFromCart)
        this.get('/:cid/purchase', passportCall('jwt'), authorization('user'), createTicket)
    }
}

module.exports = new CartsRouter()