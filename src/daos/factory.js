const config = require('../config/config')
const persistence = config.persistence

let UsersDA0 = ''
let ProductsDAO = ''
let CartsDAO = ''

switch (persistence) {
    case 'MONGO':
        config.connectDB()
        UsersDA0 = require('../daos/mongo/users.mongo')
        ProductsDAO = require('../daos/mongo/products.mongo')
        CartsDAO = require('../daos/mongo/carts.mongo')
        break
    case 'FILESYSTEM':
        UsersDA0 = require('../daos/filesystem/users.fs')
        ProductsDAO = require('../daos/filesystem/products.fs')
        CartsDAO = require('../daos/filesystem/carts.fs')
        break
}

module.exports = {
    UsersDA0,
    ProductsDAO,
    CartsDAO
}
