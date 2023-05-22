const { Router } = require("express")
const router = Router()
const ProductManager = require('../daos/mongo/ProductManager')
const { productModel } = require("../models/product.model")
const {cartModel} = require('../models/cart.model')
const product = new ProductManager('../products.json')


router.get("/", async (req, res) => {
    try {
        const products = await product.getProducts()
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
        const {page = 1} = req.query
        const {limit = 10} = req.query
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

router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById(cid).populate('products.product').lean()
        
        if (!cart) {
            res.render('cart', { cart: null })
            return;
        }

        res.render('cart', { cart })
    } catch (error) {
        console.log(error)
        res.render('cart', { cart: null })
    }
})

module.exports = router