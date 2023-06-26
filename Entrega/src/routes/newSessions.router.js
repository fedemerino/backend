const RouterClass = require("./routerClass")
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
    this.post("/login",['PUBLIC'], login)
    this.post("/register",['PUBLIC'], register)
    this.get("/logout",['PUBLIC'], logout)
    this.post("/forgotPassword", forgotPassword)
    this.get("/private",['PUBLIC'], auth, privateSection)
    this.get("/github",['PUBLIC'], githubLogin)
    this.get("/githubcallback",['PUBLIC'], githubCallback)
  }
}

module.exports = new SessionsRouter()
