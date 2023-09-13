const CartsDAO = require('../daos/factory').CartsDAO
const ProductsDAO = require('../daos/factory').ProductsDAO
const UsersDA0 = require('../daos/factory').UsersDA0
const ProductsRepository = require('../repositories/products.repository')
const CartsRepository = require('../repositories/carts.repository')
const UsersRepository = require('../repositories/users.repository')


const cartsService = new CartsRepository(new CartsDAO())
const productsService = new ProductsRepository(new ProductsDAO())
const usersService = new UsersRepository(new UsersDA0())

module.exports = { cartsService, productsService, usersService }