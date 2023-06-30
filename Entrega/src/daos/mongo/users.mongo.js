const { userModel } = require('../../models/user.model')

class UsersDaoMongo {
    constructor () {
        this.userModel = userModel
    }

    get = async (param) => {
        return await this.userModel.findOne(param)
    }

    getLean = async (param) => {
        return await this.userModel.findOne(param).lean()
    }

    create = async (newUser) => {
        return await this.userModel.create(newUser)
    }

    save = async (user) => {
        return await user.save()
    }
}

module.exports = UsersDaoMongo