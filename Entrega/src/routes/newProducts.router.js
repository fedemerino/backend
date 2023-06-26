const RouterClass = require('./routerClass')
class ProductsRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess('ok')
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = new ProductsRouter()