const { Router } = require('express')

const router = Router()

const ProductManager = require('../DAOS/ProductManager')
const product = new ProductManager('../src/products.json')


router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await product.getProducts()
        if (!limit || limit > products.length) {
            return res.status(200).send({
                status: 'success',
                results: products
            })
        }
        return res.status(200).send({
            status: 'success',
            results: products.slice(0, limit)
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productByID = await product.getProductById(parseInt(pid))
        if (!productByID) {
            return res.status(400).send({ status: 'error', error: 'product not found' })
        }
        res.status(200).send({ productByID })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router