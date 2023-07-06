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
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT,
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  GMAIL_USER_APP: process.env.GMAIL_USER_APP,
  PASS_USER_APP: process.env.PASS_USER_APP,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  connectDB: () => {
    connect(url)
      .then(() => console.log("Connected to DB"))
      .catch((err) => console.log(err))
  },
}
