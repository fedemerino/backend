const { Router } = require('express')
const { productModel } = require('../models/product.model')
const router = Router()

const ProductManager = require('../daos/ProductManager')
const product = new ProductManager('../src/products.json')


router.get('/', async (req, res) => {
    try {
        let products = await productModel.find()
        console.log(products)
        res.send({
            status: 'success',
            payload: products
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productByID = await productModel.findById(pid)
        if (!productByID) {
            return res.status(400).send({ status: 'error', error: 'product not found' })
        }
        res.status(200).send({ productByID })
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {

    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        let newProduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        }

        await productModel.create(newProduct)

        res.status(200).send({
            status: 'success',
            'newProduct': newProduct
        })
    }
    catch (error) {
        console.log(error)
    }

})

router.put('/:pid', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const { pid } = req.params
        const productToUpdate = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail
        }
        let result = await productModel.updateOne({ _id: pid }, productToUpdate)

        res.status(200).send({
            status: 'success',
            payload: result
        })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        let result = await productModel.deleteOne({ _id: pid })
        res.status(200).send({
            status: 'success',
            payload: result
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router