const fs = require('fs')

class CartManager{
    constructor(filePath){
        this.cart = []
        this.path = filePath
    }

    async appendCart(){
        const data = JSON.stringify(this.cart, 'utf-8', '\t')
        await fs.promises.writeFile(this.path, data)
    }
}

module.exports = CartManager