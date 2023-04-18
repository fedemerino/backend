const { Router } = require("express")
const router = Router()

const ProductManager = require('../daos/ProductManager')
const product = new ProductManager('../src/products.json')

router.get("/", async (req, res) => {
    try {
        res.render('realTimeProducts', [])
    } 
    catch (error) {
        
    }
})

module.exports = router