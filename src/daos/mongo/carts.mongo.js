const { cartModel } = require('../../models/cart.model')

class CartsDaoMongo {
    constructor() {
        this.cartModel = cartModel
    }
    
    get = async () => {
        try {
            return await this.cartModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (cid) => {
        try {
             return await cartModel.findById(cid)
        } catch (error) {
            console.log(error)
        }
    }

    getByUsername = async (username) => {
        try {
            return await this.cartModel.findOne({ username }).select('_id')
        } catch (error) {
            console.log(error)
        }
    }

    getByIdAndPopulate = async (cid) => {
        try {
            return await this.cartModel.findById(cid).populate('products.product')
        } catch (error) {
            console.log(error)
        }
    }

    getByIdAndUpdate = async (cid, cart) => {
        try {
            return await this.cartModel.findByIdAndUpdate(cid, cart)
        } catch (error) {
            console.log(error)
        }
    }

    create = async (newCart) => {
        try {
            return this.cartModel.create(newCart)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartsDaoMongo