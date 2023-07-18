const { ticketModel } = require('../models/ticket.model')

const cartsService = require('../services/services').cartsService
const productsService = require('../services/services').productsService

class CartsController {
    getCarts = async (req, res) => {
        try {
            console.log(req.user)
            const carts = await cartsService.get()
            res.status(200).send({ status: "success", carts })
        } catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }
    getCartById = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartsService.getByIdAndPopulate(cid)
            if (!cart) {
                req.logger.error(`error cart not found @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            res.status(200).send({
                status: "success",
                products: cart.products,
            })
        } catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    modifyCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const cart = await cartsService.getById(cid)
            if (!cart) {
                req.logger.error(`error cart not found @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            const findProduct = await productsService.getById(pid)
            if (!findProduct) {
                req.logger.error(`error product not found @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    createTicket = async (req, res) => {
        const { cid } = req.params
        try {
            console.log(req.user)
            const cart = await cartsService.getByIdAndPopulate(cid)
            if (!cart) {
                return res.status(400).send({ status: "error", error: "cart not found" })
            }
            const notAvailableProducts = []

            for (const item of cart.products) {
                const product = item.product
                const quantity = item.quantity
                const stock = item.product.stock
                if (quantity > stock) {
                    notAvailableProducts.push(item)
                } else {
                    await productsService.update(product, { stock: stock - quantity })
                }
            }

            const products = cart.products.filter(product => !notAvailableProducts.includes(product))

            const ticket = await ticketModel.create({
                products: cart.products,
                ammount: products.reduce((acc, product) => acc + product.quantity * product.product.price, 0),
                purchaser: req.user.email
            })

            if (notAvailableProducts.length > 0) {
                cart.products = notAvailableProducts
                await cartsService.getByIdAndUpdate(cid, cart)
                res.status(200).send({ status: "success", ticket, "not available products": notAvailableProducts })
            } else {
                cart.products = []
                await cartsService.getByIdAndUpdate(cid, cart)
                res.status(200).send({ status: "success", ticket })
            }
        }
        catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

}

module.exports = new CartsController()