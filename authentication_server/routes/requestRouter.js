const express = require('express')
const jwt = require('jsonwebtoken')
const token = require('../models/tokens')
const {authenticated,notAuthenticated} = require('../functions/authentication')
const router = express()


router.get('/request',authenticated,(req,res)=>{
    res.render('requests')
})

router.get('/generateToken',authenticated,(req,res)=>{
   const {AccessToken,RefreshToken} =  generateToken(req.user.email)
   
   res.cookie('refreshToken',RefreshToken,{httpOnly:true,sameSite:true})
   
   res.send({AccessToken:AccessToken})
})
router.post('/generateToken',authenticated,(req,res)=>{
    console.log(req.headers.cookie)
    res.send(req.headers.cookie)
 })
const generateToken=(email)=>{
    
  const AccessToken = jwt.sign({email:email},process.env.ACCESSTOKEN_SECRET,{expiresIn:"100s"})
  
  const RefreshToken = jwt.sign({email:email},process.env.REFRESH_TOKEN)
  token.create({refreshToken:RefreshToken})

  return {AccessToken: AccessToken,RefreshToken :RefreshToken}

}
module.exports=router 