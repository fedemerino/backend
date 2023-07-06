const { deleteProductFromCart, deleteCart, modifyCart, createCart, getCartById, getCarts, createTicket } = require('../controllers/carts.controller')
const RouterClass = require('./customRouter')
const authorization = require('../passport-jwt/authorizationRole')
const passportCall = require('../passport-jwt/passportCall')
class CartsRouter extends RouterClass {
    init() {
        this.get('/', getCarts)
        this.get('/:cid', getCartById)
        this.post('/', createCart)
        this.put('/:cid/product/:pid', modifyCart)
        this.delete('/:cid/product/:pid', deleteProductFromCart)
        this.delete('/:cid', deleteCart)
        this.get('/:cid/purchase', passportCall('jwt'), authorization('user'), createTicket)
    }
}

module.exports = new CartsRouter()