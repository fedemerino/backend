const { Schema, model, mongoose } = require("mongoose")
const { uuid } = require('uuidv4')
const collection = "tickets"

const ticketSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  code: {
    type: String,
    unique: true,
    default: () => {
      return uuid();
    }
  },
  purchase_datetime: { type: Date, required: true, default: Date.now() },
  ammount: { type: Number, required: true },
  purchaser: { type: String, required: true },
})

const ticketModel = model(collection, ticketSchema)
module.exports = { ticketModel }