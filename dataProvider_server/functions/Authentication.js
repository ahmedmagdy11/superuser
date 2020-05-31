const jwt = require('jsonwebtoken')


const AuthenticateToken=(req,res,next)=>{
    
    const header = req.headers['authorization']
    if (header == null){
       return res.sendStatus(401)
    }
    const token = header.split(' ')[1]
    jwt.verify(token,process.env.ACCESSTOKEN_SECRET,(err,user)=>{
        if (err){
            res.sendStatus(403).send('Forbidden')
        }
        
    })
    next()
}


module.exports=AuthenticateToken