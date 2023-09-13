const config = require('../config/config')
const twilio = require('twilio')

const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = config.TWILIO_PHONE_NUMBER

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

exports.sendSms = () => {
    client.messages.create({
        body: 'Hello from Node',
        to: '+543476552399',
        from: TWILIO_PHONE_NUMBER
    })
}