const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = []
        this.path = filePath
    }
    async appendProduct() {
        const data = JSON.stringify(this.products, 'utf-8', '\t')
        await fs.promises.writeFile(this.path, data)
    }
    async addProduct(title, description, code, price, status, stock, category, thumbnail) { // MÉTODO PARA AGREGAR PRODUCTOS
        try {
            this.products = await this.getProducts()
            let newProduct = {
                id: 0,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status ? status : true,
                stock: stock,
                category: category,
                thumbnail: thumbnail
            }
            if (this.products.length === 0) {
                newProduct.id = 1
            }
            else {
                newProduct.id = this.products[this.products.length - 1].id + 1
            }
            this.products.push(newProduct) //PUSHEO EL PRODUCTO AL ARRAY DE PRODUCTOS
            this.appendProduct() // AGREGO LOS PROD AL ARCHIVO
        } catch (error) {
            console.log(error)
        }

    }

    async getProducts() { // MÉTODO QUE MUESTRA TODOS LOS PRODUCTOS
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(getFileProducts)
        }
        catch (err) { console.log(err) }
    }


    async getProductById(pid) { // MÉTODO QUE BUSCA UN PRODUCTO POR SU ID
        try {
            const getFileProductById = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(getFileProductById)
            const product = products.find((prod) => prod.id === parseInt(pid))
            if (!product) {
                return console.log("not found")
            }
            return product
        }
        catch (err) { console.log(err) }
    }
    async updateProduct(id, obj) {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(getFileProducts)
            const updatedProduct = Object.assign(products[parseInt(id) - 1], obj) // remplaza el objeto del primer parámetro por el del segundo parametro
            this.products = products
            this.appendProduct()
        }
        catch (err) { console.log(err) }
    }
    async deleteProduct(id) {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(getFileProducts)
            products.splice(parseInt(id) - 1, 1)
            this.products = products
            this.appendProduct()
        }
        catch (err) { console.log(err) }
    }
}
module.exports = ProductManager