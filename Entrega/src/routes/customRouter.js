const { Router } = require('express');
const jwt = require('jsonwebtoken')
require ('dotenv').config()

class RouterClass {
    constructor() {
        this.router = Router()
        this.init()
    }
    getRouter() {
        return this.router
    }
    init() {}

    applyCallbacks(callback) {
        return callback.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                return params[1].status(500).send({ status: 'error', error: error.message })
            }
        })
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSucess = (payload) => res.send({ status: 'success', payload })
        res.sendServerError = (error) => res.status(500).send({ status: 'error', error })
        res.sendUserError = (error) => res.status(400).send({ status: 'error', error })
        next()
    }

    handlePolicies = (policies) => async (req, res, next) => {
        try {
            if(policies[0] === 'PUBLIC') return next()
            const authHeader = req.headers.authorization
            console.log('authHeader', authHeader)
            if (!authHeader) return res.send('No token provided')
            const token = authHeader.split(' ')[1]
            const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            if(!policies.includes(user.role.toUpperCase())) return res.send('Unauthorized')
            req.user = user
            console.log('user', user)
            next()
        }
        catch (error) {
            res.send(error)
        }
    }

    get(path, ...callback) {
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callback))
    }
    post(path, ...callback) {
        this.router.post(path, this.generateCustomResponse, this.applyCallbacks(callback))
    }
    put(path, ...callback) {
        this.router.put(path, this.generateCustomResponse, this.applyCallbacks(callback))
    }
    delete(path, ...callback) {
        this.router.delete(path, this.generateCustomResponse, this.applyCallbacks(callback))
    }
}


module.exports = RouterClass