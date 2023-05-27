const {Schema, model, mongoose} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const collection = 'users'

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type:String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})
userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)
module.exports = {userModel}