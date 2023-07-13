const { Error } = require('../utils/CustomError/Errors')

exports.errorHandler = (error, req, res, next) => {
    console.log(error)
    switch (error.code) {
        case Error.ROUTING_ERROR:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
            break

        case Error.VALIDATION_ERROR:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.AUTHENTICATION_ERROR:
            res.status(401).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.AUTHORIZATION_ERROR:
            res.status(403).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.NOT_FOUND_ERROR:
            res.status(404).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.CONFLICT_ERROR:
            res.status(409).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.INTERNAL_ERROR:
            res.status(500).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.DATABASE_ERROR:
            res.status(500).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.BAD_REQUEST_ERROR:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
            break
        case Error.MISSING_FIELDS:
            res.status(400).send({
                status: 'error',
                message: error.message
            })
        default:
            res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            })
    }
}