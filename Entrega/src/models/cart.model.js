const {Schema, model} = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

const cartModel = model(collection, cartSchema)

module.exports = {cartModel}