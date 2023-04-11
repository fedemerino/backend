const express = require('express')
const app = express()
const PORT = 8080

const productsRouter = require('./routes/products.router')
const { uploader } = require('./multer')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(__dirname+'/public'))

//GET http://localhost:8080/
app.use('/api/products', productsRouter)

app.post('/single', uploader.single('myfile'), (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'single file uploaded'
    })
})

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`)
})