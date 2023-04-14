const {Router} = require('express')
const router = Router()

const cartManager = require('../DAOS/CartManager')
const cart = new cartManager('../src/cart.json')

module.exports = router