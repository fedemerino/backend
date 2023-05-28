const passport = require("passport")
const local = require("passport-local")
const { userModel } = require("../models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")

const LocalStrategy = local.Strategy

const initPassport = () => {
    //config register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req,username,password,done)=>{
        const {firstName, lastName, username: userName} = req.body
        try{
            let userDB = await userModel.find({email: username})
            if(userDB){
                return done(null,false,{message: 'Email is already in use'})
            }   
            const newUser = new userModel({
                firstName,
                lastName,
                email: username,
                username: userName,
                password: createHash(password)
            })
            await newUser.save()
            return done(null,newUser)
        }
        catch(error){
            done('Error'+error)
        }
    }))
    //config login
    passport.use('login', new LocalStrategy({}, async()=>{}))

} 

module.exports = { initPassport }
