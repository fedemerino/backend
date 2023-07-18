const passport = require("passport")
const usersService = require("../services/services").usersService
const { createHash, isValidPassword } = require("../utils/bcryptHash")
const { generateToken } = require("../utils/jwt")
const { CurrentSessionDto } = require("../dto/currentSession.dto")
const { CustomError } = require("../utils/CustomError/CustomError")
const { generateUserErrorInfo } = require("../utils/CustomError/info")
const {Errors} = require("../utils/CustomError/Errors")
class SessionController {
  login = async (req, res) => {
    const { email, password } = req.body
    try {
      let role = "user"
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        role = "admin"
      }
      const userDB = await usersService.getLean({ email })
      if (!userDB) {
        return res.send({
          status: "error",
          message: "Invalid credentials",
        })
      }
      if (!isValidPassword(password, userDB)) {
        return res.status(401).send({
          status: "error",
          message: "Invalid credentials",
        })
      }
      req.session.user = {
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        username: userDB.username,
        role: role,
      }
      const accessToken = generateToken({
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        username: userDB.username,
        role: role,
      })
      req.logger.info(`${userDB.username} logged in @ ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
      res
        .cookie("accessToken", accessToken, {
          maxAge: 60 * 60 * 24,
          httpOnly: true,
        })
        .send({
          status: "success",
          message: "User logged in successfully",
          role: role,
          accessToken
        })
    } catch (error) {
      console.log(error)
      req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    }
  }

  register = async (req, res, next) => {
    try {
      const { username, password, email, firstName, lastName } = req.body
      //VALIDAR QUE NO EXISTA EL MAIL NI EL USERNAME
      if (!username || !password || !email || !firstName || !lastName) {
        CustomError.createError({
          name: 'Invalid fields',
          cause: generateUserErrorInfo({
            username,
            password,
            email,
            firstName,
            lastName
          }),
          message: 'One or more fields are invalid',
          code: Errors.INVALID_TYPE_ERROR
        })
      }
      const userExists = await usersService.get({ username })
      const emailExists = await usersService.get({ email })
      if (userExists) {
        return res.send({
          status: 'error',
          message: 'The username has already been taken'
        })
      }
      if (emailExists) {
        return res.send({
          status: 'error',
          message: 'The email has already been taken'
        })
      }
      const user = {
        username,
        password: createHash(password),
        email,
        firstName,
        lastName
      }
      await usersService.create(user)
      
      res.status(200).send({
        status: 'success',
        message: 'User created successfully',
      })
      req.logger.info(`${user.username} registered @  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    } catch (error) {
      next(error)
    }
  }

  logout = (req, res) => {
    req.session.destroy(err => {
      if (!err) {
        res.redirect('http://localhost:8080/session/login')
      }
      else {
        res.send({
          status: 'error',
          message: 'Logout failed'
        })
      }
    })
  }

  forgotPassword = async (req, res) => {
    const { email, password } = req.body
    const userDB = await usersService.get({ email })
    if (!userDB) {
      return res.status(401).send({
        status: 'error',
        message: 'The specified email is not registered'
      })
    }
    userDB.password = createHash(password)
    await usersService.save(userDB)
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    })
  }

  privateSection = (req, res) => {
    res.send('This section is only for admins')
  }

  githubLogin = passport.authenticate('github', { scope: ['user:email'] })

  githubCallback = async (req, res) => {
    try {
      await passport.authenticate('github', { failureRedirect: 'http://localhost:8080/session/login' })(req, res)
      req.session.user = req.user
      req.logger.info(`${req.user.username} logged in @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

      res.redirect('http://localhost:8080/products')
    } catch (error) {
      req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
      res.status(500).send('Internal Server Error')
    }
  }

  current = async (req, res) => {
    try {
      let user = new CurrentSessionDto(req.user.user)
      res.send(user)
    } catch (error) {
      req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    }
  }
}

module.exports = new SessionController()
