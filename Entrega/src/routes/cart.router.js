const { Router } = require("express")
const router = Router()

const cartManager = require("../DAOS/CartManager")
const cart = new cartManager("../src/cart.json")

router.post("/", async (req, res) => {
  try {
    const newCart = await cart.createCart()
    res.status(200).send({
        status: "success",
        cart: newCart 
        })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cartById = await cart.getCartById(cid)
    if (!cartById) {
      return res.status(400).send({ status: "error", error: "cart not found" })
    }
    res.status(200).send({
      status: "success",
      products: cartById.products,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params
    const cartById = await cart.getCartById(cid)
    if (!cartById) {
        return res.status(400).send({ status: "error", error: "cart not found" })
        }
    const addProductToCart = await cart.addProductToCart(cid, pid)
    res.status(200).send({ status: "success", addProductToCart })

  } catch (error) {
    console.log(error)
  }
})

module.exports = router
