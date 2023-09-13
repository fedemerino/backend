const passport = require("passport")
const local = require("passport-local")
const { userModel } = require("../models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")
const GithubStrategy = require("passport-github2")
const LocalStrategy = local.Strategy
require ("dotenv").config()

const initPassport = () => {
    //config register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req,username,password,done)=>{
        const {firstName, lastName, username: userName} = req.body
        try{
            let userDB = await userModel.find({email: username})
            if(userDB.length > 0){
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
    
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        try{    
            let user = await userModel.findById(id)
            done(null,user)
        }
        catch(error){
            done('Error'+error)
        }
    })

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username,password,done)=>{
        try {
            const userDB = await userModel.findOne({email: username})
            if(!userDB){
                return done(null,false,{message: 'Incorrect email'})
            }
            if(!isValidPassword(password,userDB)){
                return done(null,false,{message: 'Incorrect password'})
            }
            return done(null,userDB)            
        } catch (error) {
            return done('Error'+error)
        }
    }))
} 

const initPassportGithub = () => {
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['user:email']
    },async (accessToken, refreshToken, profile, done)=>{
        try {
            let user = await userModel.findOne({email: profile.emails[0].value})
            if(!user){
                let newUser = new userModel({
                    firstName: profile.displayName.split(' ')[0],
                    lastName: profile.displayName.split(' ')[profile.displayName.split(' ').length-1],
                    password: ' ',
                    username: profile.username,
                    email: profile.emails[0].value
                })
                await userModel.create(newUser)
                return done(null,newUser)
            }
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user)
    })
    passport.deserializeUser((user,done)=>{
        done(null,user)
    })
}

module.exports = { initPassport, initPassportGithub }
