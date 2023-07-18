const logger = require('../config/logger')

const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} ${req.ip}`)
    next()
}

module.exports = addLogger