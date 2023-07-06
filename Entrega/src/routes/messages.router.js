const {Router} =  require('express')
const { sendMail } = require('../utils/sendmail')
const {sendSms} = require('../utils/sendSms')
const router = Router()


// Mails
router.get('/mail', async (req, res) => {
    try {
        let to = 'federicomerinodev@gmail.com'
        let subject = 'test'
        let html = `<h1>test</h1>`
        let result = await sendMail(to, subject, html)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
    }
})

// SMS

router.get('/sms', async (req, res) => {
    try {
        let result = await sendSms()
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router