const { ObjectId } = require('mongodb')
const productsService = require('../services/services').productsService

class ProductsController {
    getProducts = async (req, res) => {
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
            if (sort === 'asc') {
                sortType = { price: 1 }
            }
            if (sort === 'desc') {
                sortType = { price: -1 }
            }
            let products = await productsService.get(mquery, limitNumber, pageNumber, sortType)

            const { docs, totalDocs, limit, totalPages, page, hasNextPage, hasPrevPage, nextPage, prevPage } = products
            if (prevPage !== null) {
                prevLink = `http://localhost:8080/api/products?page=${prevPage}&limit=${limitNumber}`
            }
            if (nextPage !== null) {
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
    }

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params
            const productByID = await productsService.getById(pid)
            if (!productByID) {
                return res.status(400).send({ status: 'error', error: 'product not found' })
            }
            res.status(200).send({status:"success", payload:productByID })
        }
        catch (error) {
            console.log(error)
        }
    }

    createProduct = async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category, thumbnail, featured } = req.body
            let product = {
                _id: new ObjectId(),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
                featured
            }
            await productsService.create(product)
            res.status(200).send({
                status: 'success',
                payload: product
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category, thumbnail, featured } = req.body
            const { pid } = req.params
            const product = {
                _id: pid,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail,
                featured: featured
            }
            let result = await productsService.update(pid, product)
            res.status(200).send({
                status: 'success',
                payload: result
            })

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            let result = await productsService.delete(pid)
            res.status(200).send({
                status: 'success',
                payload: result
            })

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new ProductsController()