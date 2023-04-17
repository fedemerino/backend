const express = require("express")
const app = express()
const PORT = 8080

const productsRouter = require("./routes/products.router")
const cartRouter = require("./routes/cart.router")
const { uploader } = require("./multer")
const handlebars = require("express-handlebars")
const {Server} = require('socket.io')
//_________________________________________________
const httpServer = app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
  })
const socketServer = new Server(httpServer)
//_________________________________________________
  

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
//handlebars
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/static", express.static(__dirname + "/public"))

app.get("/vista", (req, res) => {
    res.render('index', {
        name: 'fede',
        title: 'ecommerce'
    })
})

//GET http://localhost:8080/
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)

app.post("/single", uploader.single("myfile"), (req, res) => {
  res.status(200).send({
    status: "success",
    message: "single file uploaded",
  })
})

