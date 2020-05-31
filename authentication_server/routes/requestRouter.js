const express = require('express')
const jwt = require('jsonwebtoken')
const token = require('../models/tokens')
const {authenticated,notAuthenticated,getCookieByName} = require('../functions/authentication')
const router = express()


router.get('/request',authenticated,(req,res)=>{
    res.render('requests')
})

router.get('/generateToken',authenticated,async(req,res)=>{
    console.log("request here")
    const refreshToken = getCookieByName(req.headers.cookie,'refreshToken').replace(';','')
    let doc = null
    try{
         doc = await token.findOne({'refreshToken':refreshToken}).exec()
    }catch(err){
       return res.sendStatus(500).send("something wrong happend")
    }
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
        if (err||doc==null){
           res.sendStatus(403)

        }
           
            const accessToken = jwt.sign({email :req.email},process.env.ACCESSTOKEN_SECRET,{expiresIn:'10s'})
            res.cookie('JWT',accessToken,{sameSite:true})
            return res.sendStatus(200)
        
    })

})


module.exports=router 