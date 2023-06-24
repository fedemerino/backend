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
    init() { }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
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
        res.sendServerError = (error) => res.status(500).send({ status: 'error', error: error })
        res.sendUserError = (error) => res.status(400).send({ status: 'error', error: error })
        next()
    }

    handlePolicies = (policies) => async (req, res, next) => {
        try {
            if(policies[0] === 'PUBLIC') return next()
            const authHeader = req.headers.authorization
            if (!authHeader) return res.send('No token provided')
            const token = authHeader.split(' ')[1]
            const user = await jwt.verifyToken(token, process.env.JWT_PRIVATE_KEY)
            if(!policies.includes(user.role.toUpperCase())) return res.send('Unauthorized')
            req.user = user
            next()
        }
        catch (error) {
            res.send(error)
        }
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
}


module.exports = RouterClass