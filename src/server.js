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
const fakerRouter = require("./routes/faker.router")
const testRouter = require("./routes/test.router")
const usersRouter = require("./routes/users.router")
const { Server: ServerIO } = require('socket.io')
const { Server: ServerHTTP } = require("http")
const handlebars = require("express-handlebars")
const addLogger = require("./middlewares/logger.middleware")
const cookieParser = require("cookie-parser")
const { socketProduct } = require("./utils/socketProduct")
const session = require("express-session")
const { create } = require('connect-mongo')
const cors = require("cors")
const { initPassport } = require("./passport-jwt/passport.config")
const passport = require("passport")
const { errorHandler } = require("./middlewares/errorHandler.middleware")
const logger = require("./config/logger")
require("dotenv").config()
//_________________________________________________

const serverHTTP = ServerHTTP(app)
const io = new ServerIO(serverHTTP)

serverHTTP.listen(PORT, () => {
    logger.info(`listing on port ${PORT}`)
})

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
    secret: 'jwtsecret',
    resave: true,
    saveUninitialized: true
}))

//__________PASSPORT___________________

initPassport()
passport.use(passport.initialize())
//_______________________________

app.use((req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.session = req.session.user
    }
    next()
})

app.use(errorHandler)
app.use(addLogger)

/* SWAGGER */
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUiExpress = require("swagger-ui-express")
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Sneakers API",
            description: "Sneakers API Docs",
            version: "1.0.0",
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
//_________________________________
app.use(cookieParser('secretWord'))
app.use("/", viewsRouter)
app.use("/api/products", productsRouter.getRouter())
app.use("/api/carts", cartsRouter.getRouter())
app.use('/session', sessionsRouter.getRouter())
app.use('/api/users',usersRouter.getRouter())
app.use('/cookies', cookiesRouter)
app.use('/messages', messagesRouter)
app.use('/mockingproducts', fakerRouter)
app.use('/testLogger', testRouter)
socketProduct(io)