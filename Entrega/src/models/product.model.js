const { Schema, model, mongoose } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

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
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
})

productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema)

module.exports = { productModel }
