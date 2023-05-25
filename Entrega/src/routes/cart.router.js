const { Router } = require("express")
const router = Router()
const { cartModel } = require("../models/cart.model")
const {productModel} = require('../models/product.model')
router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find()
    res.status(200).send({ status: "success", carts })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartModel.findById(cid).populate('products.product')
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
})

router.post("/", async (req, res) => {
  try {
    const newCart = {
      products: []
    }
    await cartModel.create(newCart)
    res.status(200).send({
        status: "success",
        cart: newCart 
        })
  } catch (error) {
    console.log(error)
  }
})


router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params
    const {quantity} = req.body
    const cart = await cartModel.findById(cid)
    if (!cart) {
        return res.status(400).send({ status: "error", error: "cart not found" })
    }
    const findProduct = await productModel.findById(pid)
    if(!findProduct){
        return res.status(400).send({ status: "error", error: "product not found" })
    }
    const productInCart = cart.products.find(product => product.product == pid)
   if(productInCart){
      if(!quantity){
        productInCart.quantity = productInCart.quantity + 1
        await cartModel.findByIdAndUpdate(cid, cart)
        return res.status(200).send({ status: "success", productInCart })
      } else{
        productInCart.quantity = quantity
        await cartModel.findByIdAndUpdate(cid, cart)
        return res.status(200).send({ status: "success", productInCart })
      }
    }
    const product = {
      product: pid, 
      quantity: quantity
    }
    cart.products.push(product)
    await cartModel.findByIdAndUpdate(cid, cart)
    
    res.status(200).send({ status: "success", product })

  } catch (error) {
    console.log(error)
  }
})

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  try{
    const cart = await cartModel.findById(cid)
    if (!cart) {
        return res.status(400).send({ status: "error", error: "cart not found" })
    }
    const productInCart = cart.products.find(product => product.product == pid)
    if(!productInCart){
        return res.status(400).send({ status: "error", error: "product not found" })
    }
    cart.products = cart.products.filter(product => product.product != pid)
    await cartModel.findByIdAndUpdate(cid, cart)
    res.status(200).send({ status: "success", cart })
  }
  catch(error){
    console.log(error)
  }
})

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params
  try{
    const cart = await cartModel.findById(cid)
    if (!cart) {
        return res.status(400).send({ status: "error", error: "cart not found" })
    }
    cart.products = []
    await cartModel.findByIdAndUpdate(cid, cart)
    res.status(200).send({ status: "success", cart })
  }
  catch(error){
    console.log(error)
  }
})

module.exports = router
