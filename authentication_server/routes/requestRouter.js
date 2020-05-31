const express = require('express')
const jwt = require('jsonwebtoken')
const token = require('../models/tokens')
const {authenticated,notAuthenticated,getCookieByName} = require('../functions/authentication')
const router = express()


router.get('/request',authenticated,(req,res)=>{
    res.render('requests')
})

router.get('/generateToken',authenticated,(req,res)=>{
//    const {AccessToken,RefreshToken} =  generateToken(req.user.email)
//    console.log(getCookieByName('refreshToken'))
//    if (getCookieByName('refreshToken')==null){

//     res.cookie('refreshToken',RefreshToken,{httpOnly:true,sameSite:true}) 
//     console.log(getCookieByName('refreshToken'))
//    return  res.send({AccessToken:AccessToken})
   
//    }
//    return res.send(null)
  
})
router.post('/generateToken',authenticated,(req,res)=>{
    // let Cookie = getCookieByName(req.headers.cookie,'refreshToken')
    // console.log(Cookie)
    // res.send(Cookie)
 })


module.exports=router 