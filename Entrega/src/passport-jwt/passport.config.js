const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt
require('dotenv').config()

const cookieExtractor = (req, res) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['accessToken']
    }
    return token
}

const initPassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            console.log('jwt-payload', jwt_payload)
            return done(null, jwt_payload)
        } catch (error) {
            console.log(error)
        }
    }))
}

module.exports = { initPassport }
