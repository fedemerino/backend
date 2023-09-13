const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt
require('dotenv').config()

const cookieExtractor = (req, res) => {
    let token = null
    if (req && req.cookies) {
        if (req.cookies['accessToken']) {
            token = req.cookies['accessToken']
        }
        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1]
        }
    }
    return token
}

const initPassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            console.log(error)
        }
    }))
}

module.exports = { initPassport }
