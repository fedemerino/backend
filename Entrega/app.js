const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const product = new ProductManager('./products.json')
const PORT = 8080
//GET http://localhost:8080/
app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await product.getProducts()
        if (!limit || limit > products.length) {
            return res.send({
                status: 'success',
                results: products
            })
        }
        return res.send({
            status: 'success',
            results: products.slice(0, limit)
        })
    }
    catch (error) {
        console.log(error)
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productByID = await product.getProductById(parseInt(pid))
        if (!productByID) {
            return res.send({status:'error', error:'product not found'})
        }
        res.send({productByID})       
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})