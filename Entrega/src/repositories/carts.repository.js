class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            console.log(error)
        }
    }
    getById = async (cid) => {
        try {
            return await this.dao.getById(cid)
        } catch (error) {
            console.log(error)
        }
    }
    getByUsername = async (username) => {
        try {
            return await this.dao.getByUsername(username)
        } catch (error) {
            console.log(error)
        }
    }
    getByIdAndPopulate = async (cid) => {
        try {
            return await this.dao.getByIdAndPopulate(cid)
        } catch (error) {
            console.log(error)
        }
    }
    getByIdAndUpdate = async (cid, cart) => {
        try {
            return await this.dao.getByIdAndUpdate(cid, cart)
        } catch (error) {
            console.log(error)
        }
    }
    create = async (newCart) => {
        try {
            return await this.dao.create(newCart)
        } catch (error) {
            console.log(error)
        }
    }           
}
module.exports = CartsRepository