const socket = io()
console.log('home')

let productContainer = document.getElementById('productContainer')

socket.on('products', (products) => {
    const productos = products.map((prod) => {
        return `
        <div class="card">
        <img class="cardImg" src='static/${prod.thumbnail[0]}'>
        <p class="cardTitle">${prod.title}</p>
        <p class="cardPrice">$${prod.price}</p>
        </div>`
    }).join('')
    productContainer.innerHTML = productos
})


