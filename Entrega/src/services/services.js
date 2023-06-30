const CartsDaoMongo = require('../daos/mongo/carts.mongo')
const ProductsDaoMongo = require('../daos/mongo/products.mongo')
const UsersDaoMongo = require('../daos/mongo/users.mongo')

const cartsService = new CartsDaoMongo()
const productsService = new ProductsDaoMongo()
const usersService = new UsersDaoMongo()

module.exports = { cartsService, productsService, usersService }