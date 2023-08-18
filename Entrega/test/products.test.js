const mongoose = require('mongoose')
const Products = require('../src/daos/mongo/products.mongo')
const chai = require('chai')
const { expect } = chai

mongoose.connect('mongodb+srv://fedemerino:J4TviI4yCVromdLr@backend.lfn4tu6.mongodb.net/ecommerce')
describe('Products', () => {
    before(function () {
        this.productsDao = new Products()
    })
    it('should get all products', async function () {
        try {
            const products = await this.productsDao.get()
            expect(products).to.be.an('Object')            
        } catch (error) {
            throw error
        }
    })
})

