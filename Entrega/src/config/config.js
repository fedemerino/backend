const { connect } = require("mongoose")
const dotenv = require("dotenv")
const { program } = require("../utils/commander")
const { mode } = program.opts()

dotenv.config({
    path: `.env.${mode}`,
})

let url = process.env.MONGO_URL
console.log(mode)

module.exports = {
    port: process.env.PORT,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
  connectDB: () => {
    connect(url)
      .then(() => console.log("Connected to DB"))
      .catch((err) => console.log(err))
  },
}
