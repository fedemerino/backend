const express = require("express")
const app = express()
const PORT = 8080
const config = require("./config/config")
const productsRouter = require("./routes/products.router")
const cartRouter = require("./routes/cart.router")
const viewsRouter = require("./routes/views.router")
const cookiesRouter = require("./routes/cookies.router")
const { uploader } = require("./multer")
const {Server} = require('socket.io')
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const { socketProduct } = require("./utils/socketProduct")
const session = require("express-session")
//_________________________________________________
const httpServer = app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
  })
const io = new Server(httpServer)

config.connectDB()

//_________________________________________________

//handlebars

const hbs = handlebars.create({
    helpers:{
        multiply: function (a,b){return a*b}
    }
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
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
app.use(session({
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser('secretWord'))
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)
app.use('/cookies', cookiesRouter)

socketProduct(io)
