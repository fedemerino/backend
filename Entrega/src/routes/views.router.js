const { Router } = require("express")
const router = Router()
const ProductManager = require('../daos/mongo/ProductManager')
const { productModel } = require("../models/product.model")
const product = new ProductManager('../src/products.json')

router.get("/", async (req, res) => {
    try {
        const products = await product.getProducts()
        //const products = await productModel.find()
        res.render('home', {products} )
    } 
    catch (error) {
        console.log(error)
    }
})

router.get('/realtimeproducts' , async (req, res) => {
    try {
        const products = await product.getProducts()
        res.render('realTimeProducts', {})
    } 
    catch (error) {
        console.log(error)
    }
})

router.get("/products", async (req, res) => {
    try {
        //const products = await product.getProducts()
        const {page = 1} = req.query
        const {limit = 10} = req.query
        const {sort} = req.query
        let products = await productModel.paginate({}, { limit: limit, page: page, lean: true })
        const {docs, hasNextPage, hasPrevPage, prevPage, nextPage} = products
        res.render('products', {
            status: 'success',
            products: docs,
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage
        })
    } 
    catch (error) {
        console.log(error)
    }
})

module.exports = router