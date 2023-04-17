const fs = require("fs")

class CartManager {
  constructor(filePath) {
    this.cart = []
    this.path = filePath
  }

  async appendCart() {
    const data = JSON.stringify(this.cart, "utf-8", "\t")
    await fs.promises.writeFile(this.path, data)
  }

  async getCarts() {
    try {
      const getCartProducts = await fs.promises.readFile(this.path, "utf-8")
      return JSON.parse(getCartProducts)
    } catch (error) {
      console.log(error)
    }
  }

  async createCart() {
    try {
      this.cart = await this.getCarts()
      if (!this.cart) {
        this.cart = []
      }
      let newCart = {
        id: 0,
        products: [],
      }
      if (this.cart.length === 0) {
        newCart.id = 1
      } else {
        newCart.id = this.cart[this.cart.length - 1].id + 1
      }
      this.cart.push(newCart)
      this.appendCart()
    } catch (error) {
      console.log(error)
    }
  }
  async getCartById(cid) {
    try {
      const cartProducts = await this.getCarts()
      const cart = cartProducts.find((cart) => cart.id === parseInt(cid))
      if (!cart) {
        return console.log("not found")
      }
      return cart
    } catch (error) {
      console.log(error)
    }
  }
  async addProductToCart(cid, pid) {
    try {
      const cartProducts = await this.getCarts()
      const cartIndex = cartProducts.findIndex(
        (cart) => cart.id === parseInt(cid)
      )
      const productIndex = cartProducts[cartIndex].products.findIndex(
        (prod) => prod.id === parseInt(pid)
      )
      let newProduct = {
        id: parseInt(pid)
      }
      if (productIndex >= 0) {
        newProduct.quantity =
          cartProducts[cartIndex].products[productIndex].quantity + 1
        Object.assign(
          cartProducts[cartIndex].products[productIndex],
          newProduct
        )
      }
      else{
        newProduct.quantity = 1
        cartProducts[cartIndex].products.push(newProduct)
      }
      this.cart = cartProducts
      this.appendCart()
    } 
    catch (error) {
      console.log(error)
    }
  }
}

module.exports = CartManager
