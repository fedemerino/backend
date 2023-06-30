const RouterClass = require('./customRouter')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller')
class ProductsRouter extends RouterClass {
    init() {
        this.get('/', getProducts)
        this.get('/:pid',getProductById)
        this.post('/', createProduct)
        this.put('/:pid', updateProduct)
        this.delete('/:pid', deleteProduct)
    }
}

module.exports = new ProductsRouter()