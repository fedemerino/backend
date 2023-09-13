const bcrypt = require('bcrypt')

//function that receives the password and returns the hashed password

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//function that compares the password

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)


module.exports = {
    createHash,
    isValidPassword
}
