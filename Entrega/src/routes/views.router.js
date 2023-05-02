const { Router } = require("express")
const router = Router()
const ProductManager = require('../daos/ProductManager')
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

module.exports = router