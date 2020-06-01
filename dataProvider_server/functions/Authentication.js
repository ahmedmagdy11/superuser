const jwt = require('jsonwebtoken')


const AuthenticateTokenSUPER=(req,res,next)=>{
    
    const header = req.headers['authorization']
    if (header == null){
       return res.sendStatus(401)
    }
    const token = header.split(' ')[1]
    let valueOFError = null
    jwt.verify(token,process.env.ACCESSTOKEN_SECRET_SUPER,(err,user)=>{
        if (err){
            valueOFError=true
           
        }
        
    })
    if (valueOFError){
        return res.sendStatus(403)
    }
    next()
}
const AuthenticateTokenAnyUser=(req,res,next)=>{
    
    const header = req.headers['authorization']
    if (header == null){
       return res.sendStatus(401)
    }
    const token = header.split(' ')[1]
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
    
    if (valueOFErrorSuper&&valueOFErrorNormal){
        return res.sendStatus(403)
    }
    next()
}

module.exports={AuthenticateTokenSUPER:AuthenticateTokenSUPER , AuthenticateTokenAnyUser:AuthenticateTokenAnyUser}