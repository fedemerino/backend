const RouterClass = require("./customRouter")
const auth = require("../passport-jwt/passportCall")
const passportCall = require("../passport-jwt/passportCall")
const authorization = require('../passport-jwt/authorizationRole')
const {
  login,
  register,
  logout,
  forgotPassword,
  privateSection,
  githubLogin,
  githubCallback,
  current
} = require("../controllers/sessions.controller")

class SessionsRouter extends RouterClass {
  init() {
    this.post("/login", login)
    this.post("/register", register)
    this.get("/logout", logout)
    this.post("/forgotPassword", forgotPassword)
    this.get("/private", auth, privateSection)
    this.get("/github", githubLogin)
    this.get("/githubcallback", githubCallback)
    this.get('/current', passportCall('jwt'), authorization('user'), current)
  }
}

module.exports = new SessionsRouter()
