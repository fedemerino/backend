const { UsersDto } = require("../dto/users.dto")

class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async (param) => {
        try {
            return await this.dao.get(param)
        } catch (error) {
            console.log(error)
        }
    }
    getLean = async (param) => {
        try {
            return await this.dao.getLean(param)
        } catch (error) {
            console.log(error)
        }
    }
    create = async (user) => {
        try {
            const newUser = new UsersDto(user)
            return await this.dao.create(newUser)
        } catch (error) {
            console.log(error)
        }
    }
    save = async (user) => {
        try {
            return await this.dao.save(user)
        } catch (error) {
            console.log(error)
        }
    }
    delete = async (param) => {
        try {
            return await this.dao.delete(param)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UsersRepository