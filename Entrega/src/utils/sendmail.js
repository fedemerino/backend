const nodemailer = require('nodemailer')
const config = require('../config/config')
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_USER_APP,
        pass: config.PASS_USER_APP
    }
})

exports.sendMail = async (to, subject, html) => {
    return await transport.sendMail({
        from: 'Federico',
        to: to,
        subject: subject,
        html: html,
        attachments: [
            {
                filename: 'af107.png',
                path: 'src/public/img/af107.png',
                cid: 'af107'
            }
        ]
    })
}
