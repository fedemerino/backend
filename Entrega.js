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
    addProduct(title, description, price, thumbnail, code, stock) { // MÉTODO PARA AGREGAR PRODUCTOS

        if (!this.products.some((prod) => prod.code === code)) { //VALIDO QUE NO EXISTA UN PRODUCTO CON EL MISMO CÓDIGO EN EL ARRAY DE PRODUCTOS
            if (title && description && price && thumbnail && code && stock) { //VALIDO QUE TODOS LOS CAMPOS TENGAN ALGÚN VALOR
                let newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                if (this.products.length === 0) {
                    newProduct.id = 1
                }
                else {
                    newProduct.id = this.products[this.products.length - 1].id + 1
                }
                this.products.push(newProduct) //PUSHEO EL PRODUCTO AL ARRAY DE PRODUCTOS
                this.appendProduct() // AGREGO LOS PROD AL ARCHIVO
            }
            else return console.log("Hay campos sin completar")
        }
        else return console.log("Ya existe un producto con ese codigo")
    }

    async getProducts() { // MÉTODO QUE MUESTRA TODOS LOS PRODUCTOS
        try {
            const getFileProducts = await fs.promises.readFile(this.path,'utf-8')
            return console.table(getFileProducts)
        }
        catch (err) { console.log(err) }
    }

    
    async getProductById(id) { // MÉTODO QUE BUSCA UN PRODUCTO POR SU ID
        try{
            const getFileProductById = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(getFileProductById)
            const product = products.find((prod) => prod.id === id)
            product ? console.table(product) : console.log("Not found")
        }
        catch(err){console.log(err)}
    }
    async updateProduct(id, obj){
        try{
            const getFileProducts = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(getFileProducts)
            const updatedProduct = Object.assign(products[id-1],obj) // remplaza el objeto del primer parámetro por el del segundo parametro
            this.products = products
            this.appendProduct()
        }
        catch(err){console.log(err)}
    }
    async deleteProduct(id){
        try{
            const getFileProducts = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(getFileProducts)
            products.splice(id-1,1)
            this.products = products
            this.appendProduct()
        }
        catch(err){console.log(err)}
    }
}

/* let newProduct = new ProductManager()
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 25)
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc12323', 25)
newProduct.getProductById(1)
newProduct.getProductById(2)
newProduct.getProducts() */
let prod = new ProductManager('./products.json')
prod.addProduct('CocaCola', 'CocaCola', 500, 'sin imagen', 'abc123', 25)
prod.addProduct('Sprite', 'Sprite', 450, 'sin imagen', 'abc13e23', 25)
prod.getProducts()
prod.updateProduct(1, {'price':'700'})
prod.getProducts()
prod.deleteProduct(2)

