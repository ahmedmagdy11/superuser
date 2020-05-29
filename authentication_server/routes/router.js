if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const users = require('../models/users')
const initilizePassport = require('../configs/passport-config')
const authenticated = require('../functions/authentication').authenticated
const router = express()


const getUser=async(email)=>{
    try{
       const doc =  await users.findOne({email}).exec()
        return doc
    }catch(err){
        console.log(err)
    }

}
initilizePassport(passport,getUser)
router.set('views')
router.set('view engine', 'ejs');
router.use(flash())
router.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))


router.get('/',(req,res)=>{
    
    res.render('index',{error:false})
})

router.post('/',async(req,res)=>{
    const Data ={
        email:req.body.email,
        password:await bcrypt.hash(req.body.pass,10)
    }
    users.findOne({email:Data.email},async(err,doc)=>{
        if (doc==null&&!err){
           await users.create(Data)
           res.send(Data)
        }
        else{
            res.render('index',{error : true})
        }
    })
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