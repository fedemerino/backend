const {Schema, model} = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
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