const { ProductsDto } = require("../dto/products.dto")

class ProductsRepository {
    constructor(dao){
        this.dao = dao
    }
    get = async (mquery, limitNumber, pageNumber, sortType) => {
        try {
            return await this.dao.get(mquery, limitNumber, pageNumber, sortType)
        } catch (error) {
            console.log(error)
        }
    }
    getById = async (pid) => {
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            console.log(error)
        }
    }
    create = async (product) => {
        try {
            const newProduct = new ProductsDto(product)
            return await this.dao.create(newProduct)
        } catch (error) {
            console.log(error)
        }
    }
    update = async (pid, product) => {
        try {
            const newProduct = new ProductsDto(product)
            return await this.dao.update(pid, newProduct)
        } catch (error) {
            console.log(error)
        }
    }
    delete = async (pid) => {
        try {
            return await this.dao.delete(pid)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsRepository