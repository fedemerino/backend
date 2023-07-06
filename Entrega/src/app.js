const express = require("express")
const app = express()
const config = require("./config/config")
const PORT = config.port
const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const viewsRouter = require("./routes/views.router")
const cookiesRouter = require("./routes/cookies.router")
const sessionsRouter = require("./routes/sessions.router")
const messagesRouter = require("./routes/messages.router")
const { Server } = require('socket.io')
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const { socketProduct } = require("./utils/socketProduct")
const session = require("express-session")
const { create } = require('connect-mongo')
// const { initPassport, initPassportGithub } = require("./config/passport.config")
const cors = require("cors")
const { initPassport } = require("./passport-jwt/passport.config")
const passport = require("passport")
require("dotenv").config()
//_________________________________________________
const httpServer = app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})

const io = new Server(httpServer)
//_________________________________________________

//handlebars

const hbs = handlebars.create({
    helpers: {
        multiply: function (a, b) { return a * b }
    }
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
app.use(cors())
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
//_______________________________

app.use(session({
    store: create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 60 * 60 * 24,
    }),
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}))

//__________PASSPORT___________________

initPassport()
//initPassportGithub()
passport.use(passport.initialize())
//passport.use(passport.session())
//_______________________________

app.use((req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.session = req.session.user
    }
    next()
})

//_________________________________
app.use(cookieParser('secretWord'))
app.use("/", viewsRouter)
app.use("/api/products", productsRouter.getRouter())
app.use("/api/carts", cartsRouter.getRouter())
app.use('/session', sessionsRouter.getRouter())
app.use('/cookies', cookiesRouter)
app.use('/messages', messagesRouter)
socketProduct(io)