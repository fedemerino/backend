const { Router } = require('express')

const router = Router()

const ProductManager = require('../daos/ProductManager')
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

router.post('/', async (req, res) => {

    const { title, description, code, price, status, stock, category, thumbnail } = newProduct = req.body
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).send({ status: 'error', error: 'todos los campos son necesarios' })
    }
    let products = await product.getProducts()
    if (!products.some((prod) => prod.code === code)) {
        product.addProduct(title, description, code, price, status, stock, category, thumbnail)
        return res.status(200).send({ status: 'success', 'newProduct': newProduct })
    }
    return res.status(400).send({ status: 'error', error: 'ya existe un producto con ese codigo' })
})

router.put('/:pid', async (req, res) => {
    const updatedProduct = req.body
    const { pid } = req.params
    if (Object.keys(updatedProduct).length === 0) {
        return res.status(400).send({ status: 'error', error: 'no se han enviado datos para actualizar' })
    }
    await product.updateProduct(pid, updatedProduct)
    return res.status(200).send({ status: 'success', 'updatedProduct': await product.getProductById(pid) })
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const productToDelete = await product.getProductById(pid)
    if (!productToDelete) {
        return res.status(400).send({ status: 'error', error: 'product not found' })
    }
    await product.deleteProduct(pid)
    return res.status(200).send({ status: 'success', 'deletedProduct': productToDelete })
})

module.exports = router