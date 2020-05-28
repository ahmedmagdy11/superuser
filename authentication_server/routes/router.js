const express = require('express')
const users = require('../models/users')
const bcrypt = require('bcrypt')
const router = express()


router.set('views')
router.set('view engine', 'ejs');

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


module.exports = router