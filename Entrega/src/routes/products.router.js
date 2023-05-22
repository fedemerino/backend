const { Router } = require('express')
const router = Router()
const { productModel } = require('../models/product.model')
const { ObjectId } = require('mongodb')
router.get('/', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1
        const limitNumber = parseInt(req.query.limit) || 10
        const { query, sort } = req.query
        let prevLink = null
        let nextLink = null
        let mquery = {}
        if (query) {
            //regex to search by title no case sensitive
            mquery.title = { $regex: new RegExp(query, 'i') };
        }
        let sortType = {}
        if(sort === 'asc'){
            sortType = { price: 1}
        }
        if(sort === 'desc'){
            sortType = { price: -1}
        }
        let products = await productModel.paginate(mquery, { limit: limitNumber, page: pageNumber, sort: sortType })
        const { docs, totalDocs, limit, totalPages, page, hasNextPage, hasPrevPage, nextPage, prevPage  } = products
        if(prevPage !== null){
            prevLink = `http://localhost:8080/api/products?page=${prevPage}&limit=${limitNumber}`
        }
        if(nextPage !== null){
            nextLink = `http://localhost:8080/api/products?page=${nextPage}&limit=${limitNumber}`
        }
        res.send({
            status: 'success',
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productByID = await productModel.findById(pid)
        if (!productByID) {
            return res.status(400).send({ status: 'error', error: 'product not found' })
        }
        res.status(200).send({ productByID })
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {

    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        let newProduct = {
            _id: new ObjectId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        }
        await productModel.create(newProduct)
        res.status(200).send({
            status: 'success',
            'newProduct': newProduct
        })
    }
    catch (error) {
        console.log(error)
    }

})

router.put('/:pid', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const { pid } = req.params
        const productToUpdate = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail
        }
        let result = await productModel.updateOne({ _id: pid }, productToUpdate)

        res.status(200).send({
            status: 'success',
            payload: result
        })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        let result = await productModel.deleteOne({ _id: pid })
        res.status(200).send({
            status: 'success',
            payload: result
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router