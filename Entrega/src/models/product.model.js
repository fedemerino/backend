const { Schema, model, mongoose } = require("mongoose")

const collection = "products"

const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: Array, required: true },
})

const productModel = model(collection, productSchema)

module.exports = { productModel }
