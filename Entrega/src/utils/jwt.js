require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send({
            status: 'error',
            message: 'Unauthorized'
        })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({
                status: 'error',
                message: 'Forbidden'
            })
        }
        req.user = user
        next()
    })
}

module.exports = { generateToken, authToken }