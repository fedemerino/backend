const RouterClass = require('./customRouter')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller')
const passportCall = require('../passport-jwt/passportCall')
const authorization = require('../passport-jwt/authorizationRole')
class ProductsRouter extends RouterClass {
    init() {
        this.get('/', getProducts)
        this.get('/:pid', getProductById)
        this.post('/', passportCall('jwt'), authorization('admin'), createProduct)
        this.put('/:pid', passportCall('jwt'), authorization('admin'), updateProduct)
        this.delete('/:pid', passportCall('jwt'), authorization('admin'), deleteProduct)
    }
}

module.exports = new ProductsRouter()