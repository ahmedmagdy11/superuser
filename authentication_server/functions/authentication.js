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

module.exports={authenticated:authenticated,notAuthenticated:notAuthenticated}