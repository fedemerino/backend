const RouterClass = require('./customRouter')
const generateProducts = require('../utils/generateFakeProducts')

class FakerRouter extends RouterClass {
    init() {
        this.get('/', (req, res) => {
            const products = []
            for (let i = 0; i < 100; i++) {
                products.push(generateProducts())
            }
            res.status(200).send(products)
        })
    }
}


module.exports = new FakerRouter().router