const { productModel } = require('../../models/product.model')

class ProductsDaoMongo {
    constructor() {
        this.productModel = productModel
    }

    get = async (mquery, limitNumber, pageNumber, sortType, user) => {
    try {
        const query = { ...mquery }
        if (user) {
            query.owner = user
        }

        return await this.productModel.paginate(query, { limit: limitNumber, page: pageNumber, sort: sortType })
    } catch (error) {
        console.log(error);
    }
}

    getById = async (pid) => {
        try {
            return await this.productModel.findById(pid)
        } catch (error) {
            console.log(error)
        }
    }

    create = async (newProduct) => {
        try {
            return await this.productModel.create(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    update = async (pid, product) => {
        try {
            return await this.productModel.updateOne({ _id: pid }, product)
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (pid) => {
        try {
            return await this.productModel.deleteOne({ _id: pid })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsDaoMongo