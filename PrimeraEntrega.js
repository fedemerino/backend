let products = []

class ProductManager {
    constructor() {
        this.products = products
    }
    addProduct(title, description, price, thumbnail, code, stock) { // MÉTODO PARA AGREGAR PRODUCTOS
        if (!products.some((prod) => prod.code === code)) { //VALIDO QUE NO EXISTA UN PRODUCTO CON EL MISMO CÓDIGO EN EL ARRAY DE PRODUCTOS
            if (title && description && price && thumbnail && code && stock) { //VALIDO QUE TODOS LOS CAMPOS TENGAN ALGÚN VALOR
                let newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: products.length + 1
                }
                this.products.push(newProduct) //PUSHEO EL PRODUCTO AL ARRAY DE PRODUCTOS
            }
            else console.log("Hay campos sin completar")
        }
        else console.log("Ya existe un producto con ese codigo")
    };
    getProducts() {
        console.table(this.products) // MÉTODO QUE MUESTRA TODOS LOS PRODUCTOS
    };
    getProductById(id) { // MÉTODO QUE BUSCA UN PRODUCTO POR SU ID
        let getProduct = products.find((prod) => prod.id === id)
        getProduct ? console.table(getProduct) : console.log("Not found")
    };
}

let newProduct = new ProductManager()
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.getProducts()
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123', 25)
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 25)
newProduct.addProduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc12323', 25)
newProduct.getProductById(1)
newProduct.getProductById(2)
newProduct.getProducts()

