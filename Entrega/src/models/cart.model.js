const {Schema, model, mongoose} = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
})

const cartModel = model(collection, cartSchema)

module.exports = {cartModel}