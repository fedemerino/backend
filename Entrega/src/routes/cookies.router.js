const {Router} = require('express')
const auth = require('../middlewares/auth.middleware')
const router = Router()

router.get('/set', (req, res) => {
    res.cookie('cart', 'esta es la cookie del cart', {maxAge:10000}).send('ok')
})
router.get('/get', (req, res) => {
    res.send(req.cookies)
})
router.get('/clear', (req, res) => {
    res.clearCookie('cart').send('cookie removida')
})
router.get('/setSigned', (req, res) => {
    res.cookie('cartSigned', 'esta es la cookie firmada del cart', {maxAge:10000, signed:true}).send('ok')
})
router.get('/getSigned', (req,res) => {
    res.send(req.signedCookies)
})

// sessions

router.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`Usted visitó la página ${req.session.counter} veces`)
    }
    else{
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/private', auth, (req,res) => {
    res.send('Sección para admin')
})


router.post('/session', (req,res) => {
    const {username, password} = req.body
    if(username == 'admin' && password == 'admin'){
        req.session.user = username
        req.session.admin = false
        res.send('login exitoso')
    }
    else{
        res.send('login fallido')
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(!err){
            res.send('vuelva prontos')
        }
        else{
            res.send({status:'error', body:err})
        }
    })
})

module.exports = router