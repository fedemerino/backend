let products = []

class ProductManager {
    constructor() {
        this.products = products
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!products.some((prod) => prod.code === newProduct.code)) {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
            this.id = products.length + 1
            products.push(newProduct)
        }
        else console.log("Ya existe un producto con ese codigo")
    };
    getProducts = () => {
        console.table(products)
    };
    getProductById = (id) => {
        let getProduct = products.find((prod) => prod.id === id)
        getProduct ? console.table(getProduct) : console.log("Not found")
    };
}

let newProduct = new ProductManager()
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.getProductById(1)
newProduct.getProductById(2)
