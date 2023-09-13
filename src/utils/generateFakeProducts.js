const {faker} = require('@faker-js/faker')
const { uuid } = require('uuidv4')
const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: uuid(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
        featured: faker.datatype.boolean(),
        created_at: faker.date.recent(),
    }
}

module.exports = generateProducts