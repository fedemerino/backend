const { ObjectId } = require('mongodb')
const productsService = require('../services/services').productsService
const CustomError = require("../utils/CustomError/CustomError")
const { createProductErrorInfo } = require("../utils/CustomError/info")
const { Errors } = require("../utils/CustomError/Errors")

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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params
            const productByID = await productsService.getById(pid)
            if (!productByID) {
                req.logger.error(`error product not found @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return res.status(400).send({ status: 'error', error: 'product not found' })
            }
            res.status(200).send({ status: "success", payload: productByID })
        }
        catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const { title, description, code, price, status, stock, category, thumbnail, featured } = req.body
            if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail || !featured) {
                CustomError.createError({
                    name: 'Missing Fields Error',
                    cause: createProductErrorInfo(req.body),
                    message: 'One or more of the following fields are missing:',
                    code: Errors.MISSING_FIELDS
                })
            }
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
            next(error)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
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
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

}

module.exports = new ProductsController()