const RouterClass = require("./customRouter")
const auth = require("../middlewares/auth.middleware")
const {
  login,
  register,
  logout,
  forgotPassword,
  privateSection,
  githubLogin,
  githubCallback,
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
  }
}

module.exports = new SessionsRouter()
