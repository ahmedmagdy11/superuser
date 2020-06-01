const express = require('express')
const jwt = require('jsonwebtoken')
const token = require('../models/tokens')
const {authenticated,notAuthenticated,getCookieByName} = require('../functions/authentication')
const router = express()


router.get('/request',authenticated,(req,res)=>{
    res.render('requests')
})

router.get('/generateToken',authenticated,async(req,res)=>{
    
    //Check if the original JWT is Still Valid 

    let valueOFErrorSuper = null
    let valueOFErrorNormal = null
    jwt.verify(token,process.env.ACCESSTOKEN_SECRET_SUPER,(err,user)=>{
        if (err){
            valueOFErrorSuper=true
           
        }
        
    })
    jwt.verify(token,process.env.ACCESSTOKEN_SECRET_NORMAL,(err,user)=>{
        if (err){
            valueOFErrorNormal=true
           
        }
        
    })
    
    if (valueOFErrorSuper==null&&valueOFErrorNormal==null){
        return res.sendStatus(200)
    }

    //////////////////
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
            let TokenSECRET =process.env.ACCESSTOKEN_SECRET_SUPER
            if (req.user.type==false){
                TokenSECRET =process.env.ACCESSTOKEN_SECRET_NORMAL
            }
            const accessToken = jwt.sign({email :req.email},TokenSECRET,{expiresIn:'100s'})
            res.cookie('JWT',accessToken,{sameSite:true})
            return res.sendStatus(200)
        
    })

})


module.exports=router 