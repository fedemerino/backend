const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const { userModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const passport = require('passport')
const { createToken } = require('../utils/jwt')
const router = Router()

router.get('/private', auth, (req, res) => {
    res.send('This section is only for admins')
})

//__________LOCAL LOGIN&REGISTER___________
/* 
 router.post('/register', async(req,res) => {
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
    
})  */

//__________PASSPORTLOCAL LOGIN&REGISTER___________

  router.post('/register', passport.authenticate('register', {
    failureRedirect: 'http://localhost:8080/session/register?error=Email%20Already%20In%20Use'
}), async (req, res) => {
    res.status(200).send({ status: 'success', message: 'User created successfully' })
}) 


  router.post('/login', passport.authenticate('login', {
    failureRedirect: 'http://localhost:8080/session/login?error=Invalid%20Credentials'
}), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: 'error', message: 'Invalid credentials' })
    }
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role
    }
    res.redirect('http://localhost:8080/products')
})
//__________GITHUB LOGIN___________

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/githubcallback', passport.authenticate('github',{failureRedirect: 'http://localhost:8080/session/login'}),async(req,res)=>{
    req.session.user = req.user
    res.redirect('http://localhost:8080/products')
})



//__________LOGOUT___________

router.get('/logout', (req, res) => {
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
})

//__________FORGOT PASSWORD___________

router.post('/forgotPassword', async (req, res) => {
    const { email, password } = req.body
    const userDB = await userModel.findOne({ email })
    if (!userDB) {
        return res.status(401).send({
            status: 'error',
            message: 'The specified email is not registered'
        })
    }
    userDB.password = createHash(password)
    await userDB.save()
    res.status(200).json({
        status: 'success',
        message: 'Password changed successfully'
    })
})


//__________SESSION COUNTER___________

router.get('/counter', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`You've visited this page ${req.session.counter} times`)
    }
    else {
        req.session.counter = 1
        res.send('Welcome')
    }
})


//__________JWT LOGIN&REGISTER___________

// router.post('/register', async(req,res) => {
//     try {
//         const {username , password, email, firstName, lastName} = req.body
//     //VALIDAR QUE NO EXISTA EL MAIL NI EL USERNAME
//     const userExists = await userModel.findOne({username})
//     const emailExists = await userModel.findOne({email})
//     if(userExists){
//         return res.send({
//             status: 'error',
//             message: 'The username has already been taken'
//         })
//     }
//     if(emailExists){
//         return res.send({
//             status: 'error',
//             message: 'The email has already been taken'
//         })
//     }
//     const newUser = {
//         username,
//         password: createHash(password),
//         email,
//         firstName,
//         lastName
//     }
//     await userModel.create(newUser)
//     res.status(200).send({
//         status: 'success',
//         message: 'User created successfully',
//     })

//     } catch (error) {
//         console.log(error)
//     }
    
// }) 


//  router.post('/login', async (req,res) => {
//     const {email, password} = req.body
//     try {
//         let role = 'usuario'
//         if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
//         role = 'admin'
//         }
//         const {password, ...userDB} = await userModel.findOne({email}).lean()
//         console.log(userDB)
//         if(!userDB){
//             return res.send({
//                 status: 'error',
//                 message: 'Invalid credentials'
//             })
//         }
//         //validate password
//        /*  if(!isValidPassword(password, userDB)){
//             return res.status(401).send({
//                 status: 'error',
//                 message: 'Invalid credentials'
//             })
//         } */
        
//        /*  req.session.user = {
//             firstName: userDB.firstName,
//             lastName: userDB.lastName,
//             email: userDB.email,
//             username: userDB.username,
//             role: role
//         } */

//         const accessToken = createToken({
//             firstName: userDB.firstName,
//             lastName: userDB.lastName,
//             email: userDB.email,
//             username: userDB.username
//         })
//         res.send({
//             status: 'success',
//             message: 'User logged in successfully',
//             accessToken
//         })

//         //res.redirect('http://localhost:8080/products')
//     } catch (error) {
//         console.log(error)
//     }
    
// }) 

module.exports = router