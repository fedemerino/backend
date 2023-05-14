const { Schema, model } = require("mongoose")

const collection = "orders"

const orderSchema = new Schema({
    name: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    price: Number,
    quantity: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

const orderModel = model(collection, orderSchema)
module.exports = { orderModel }