if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const users = require('../models/users')
const requestRouter = require('./requestRouter')
const initilizePassport = require('../configs/passport-config')
const {authenticated,notAuthenticated} = require('../functions/authentication')
const generateToken = require('../functions/authentication').generateToken
const router = express()


const getUserByEmail=async(email)=>{
    try{
       const doc =  await users.findOne({email}).exec()
        return doc
    }catch(err){
        console.log(err)
        return null
    }

}
const getUserByID=async(id)=>{
    try{
        
       const doc =  await users.findById(id).exec() 
        return doc
    }catch(err){
        return null
    }

}
initilizePassport(passport,getUserByEmail,getUserByID)
router.set('views')
router.set('view engine', 'ejs');
router.use(flash())
router.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(requestRouter)

router.post('/login',passport.authenticate('local',{
    failureRedirect:'/login',
    failureFlash:true
}),(req,res)=>{
    const {AccessToken,RefreshToken} =  generateToken(req.user.email)
    res.cookie('JWT',AccessToken,{sameSite:true})
    res.cookie('refreshToken',RefreshToken,{httpOnly:true,sameSite:true}) 
    res.redirect('/request')
})
router.get('/',notAuthenticated,(req,res)=>{
    
    res.render('index',{error:false})
})

router.post('/',notAuthenticated,async(req,res)=>{
    
    let value = false
    
    if (req.body.superuser){
        value=true
    }
    const Data ={
        username : req.body.user,
        email:req.body.email,
        password:await bcrypt.hash(req.body.pass,10),
        superuser:value

    }
    users.findOne({email:Data.email},async(err,doc)=>{
        if (doc==null&&!err){
           await users.create(Data)
           res.redirect('/login')
        }
        else{
            res.render('index',{error : true})
        }
    })
})
router.get('/login',notAuthenticated,(req,res)=>{
    res.render('login')
})
router.delete('/',(req,res)=>{
    users.remove({},(err)=>{
        if (!err){
            res.render('index',{error:false})
        }
        else {
            res.render('index',{error:true})
        }
    })
})

module.exports = router