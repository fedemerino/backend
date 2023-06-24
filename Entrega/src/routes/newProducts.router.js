const { Router } = require('express');
const RouterClass = require('./routerClass')
class productsRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLICC'], async (req, res) => {
            try {
                res.sendSuccess('ok')
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = productsRouter 