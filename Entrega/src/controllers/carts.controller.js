const cartsService = require('../services/services').cartsService
const productsService = require('../services/services').productsService

class CartsController {
    getCarts = async (req, res) => {
        try {
            const carts = await cartsService.get()
            res.status(200).send({ status: "success", carts })
        } catch (error) {
            console.log(error)
        }
    }
    getCartById = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartsService.getByIdAndPopulate(cid)
            if (!cart) {
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            res.status(200).send({
                status: "success",
                products: cart.products,
            })
        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (req, res) => {
        try {
            const newCart = {
                products: []
            }
            await cartsService.create(newCart)
            res.status(200).send({
                status: "success",
                cart: newCart
            })
        } catch (error) {
            console.log(error)
        }
    }

    modifyCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const cart = await cartsService.getById(cid)
            if (!cart) {
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            const findProduct = await productsService.getById(pid)
            if (!findProduct) {
                return res.status(400).send({ status: "error", error: "product not found" })
            }
            const productInCart = cart.products.find(product => product.product == pid)
            if (productInCart) {
                if (!quantity) {
                    productInCart.quantity = productInCart.quantity + 1
                    await cartsService.getByIdAndUpdate(cid, cart)
                    return res.status(200).send({ status: "success", productInCart })
                } else {
                    productInCart.quantity = quantity
                    await cartsService.getByIdAndUpdate(cid, cart)
                    return res.status(200).send({ status: "success", productInCart })
                }
            }
            const product = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(product)
            await cartsService.getByIdAndUpdate(cid, cart)

            res.status(200).send({ status: "success", product })

        } catch (error) {
            console.log(error)
        }
    }

    deleteProductFromCart = async (req, res) => {
        const { cid, pid } = req.params
        try {
            const cart = await cartsService.getById(cid)
            if (!cart) {
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            const productInCart = cart.products.find(product => product.product == pid)
            if (!productInCart) {
                return res.status(400).send({ status: "error", error: "product not found" })
            }
            cart.products = cart.products.filter(product => product.product != pid)
            await cartsService.getByIdAndUpdate(cid, cart)
            res.status(200).send({ status: "success", cart })
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteCart = async (req, res) => {
        const { cid } = req.params
        try {
            const cart = await cartsService.getById(cid)
            if (!cart) {
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            cart.products = []
            await cartsService.getByIdAndUpdate(cid, cart)
            res.status(200).send({ status: "success", cart })
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CartsController()