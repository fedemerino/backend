const {Router} = require('express')
const auth = require('../middlewares/auth.middleware')
const router = Router()

router.get('/set', (req, res) => {
    res.cookie('cart', "This is cart's cookie", {maxAge:10000}).send('ok')
})
router.get('/get', (req, res) => {
    res.send(req.cookies)
})
router.get('/clear', (req, res) => {
    res.clearCookie('cart').send('cookie removida')
})
router.get('/setSigned', (req, res) => {
    res.cookie('cartSigned', "This is cart's signed cookie", {maxAge:10000, signed:true}).send('ok')
})
router.get('/getSigned', (req,res) => {
    res.send(req.signedCookies)
})

module.exports = router