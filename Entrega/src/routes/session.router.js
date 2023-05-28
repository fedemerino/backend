const {Router} = require('express')
const auth = require('../middlewares/auth.middleware')
const { userModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const passport = require('passport')
const router = Router()

router.get('/private', auth, (req,res) => {
    res.send('This section is only for admins')
})

/* router.post('/register', async(req,res) => {
    try {
        const {username , password, email, firstName, lastName} = req.body
    //VALIDAR QUE NO EXISTA EL MAIL NI EL USERNAME
    const userExists = await userModel.findOne({username})
    const emailExists = await userModel.findOne({email})
    if(userExists){
        return res.send({
            status: 'error',
            message: 'The username has already been taken'
        })
    }
    if(emailExists){
        return res.send({
            status: 'error',
            message: 'The email has already been taken'
        })
    }
    const newUser = {
        username,
        password: createHash(password),
        email,
        firstName,
        lastName
    }
    await userModel.create(newUser)
    res.status(200).send({
        status: 'success',
        message: 'User created successfully',
    })

    } catch (error) {
        console.log(error)
    }
    
}) */

router.post('/register', passport.authenticate('register',{
    failureRedirect: 'http://localhost:8080/session/register'
}), async(req,res)=> {
    res.status(200).send({status:'success', message:'User created successfully'})
})



router.post('/login', async (req,res) => {
    const {email, password} = req.body
    try {
        let role = 'usuario'
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        role = 'admin'
        }
        const userDB = await userModel.findOne({email})
        if(!userDB){
            return res.send({
                status: 'error',
                message: 'Invalid credentials'
            })
        }
        //validate password
        if(!isValidPassword(password, userDB)){
            return res.status(401).send({
                status: 'error',
                message: 'Invalid credentials'
            })
        }
        
        req.session.user = {
            firstName: userDB.firstName,
            lastName: userDB.lastName,
            email: userDB.email,
            username: userDB.username,
            role: role
        }
        res.redirect('http://localhost:8080/products')
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(!err){
            res.redirect('http://localhost:8080/session/login')
        }
        else{
            res.send({
                status:'error',
                message:'Logout failed'
            })
        }
    })
})


router.get('/counter', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`You've visited this page ${req.session.counter} times`)
    }
    else{
        req.session.counter = 1
        res.send('Welcome')
    }
})

router.post('/forgotPassword',async (req,res) => {
    const {email, password} = req.body
    const userDB = await userModel.findOne({email})
    if(!userDB){
        return res.status(401).send({
            status:'error',
            message:'The specified email is not registered'
        })
    }
    userDB.password = createHash(password)
    await userDB.save()
    res.status(200).json({
        status:'success',
        message:'Password changed successfully'
    })
})

module.exports = router