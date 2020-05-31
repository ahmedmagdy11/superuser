const jwt = require('jsonwebtoken')
const token = require('../models/tokens')


const getCookieByName =(cookies,name)=>{
    const arrOfCookies = cookies.split(' ')
    let yourCookie = null
    // console.log(arrOfCookies)
    arrOfCookies.forEach(element => {
        if(element.includes(name)){
            yourCookie = element.replace(name+'=','')
        }
    });
    return yourCookie
}
const authenticated =(req,res,next)=>{
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}   

function notAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/request')
    }
    next()
}
const generateToken=(email)=>{
    
    const AccessToken = jwt.sign({email:email},process.env.ACCESSTOKEN_SECRET,{expiresIn:"10s"})
    
    const RefreshToken = jwt.sign({email:email},process.env.REFRESH_TOKEN)
    token.create({refreshToken:RefreshToken})
  
    return {AccessToken: AccessToken,RefreshToken :RefreshToken}
  
  }
module.exports={
    authenticated:authenticated,
    notAuthenticated:notAuthenticated,
    getCookieByName:getCookieByName,
    generateToken:generateToken   
}