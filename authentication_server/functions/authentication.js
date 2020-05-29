const authenticated =(req,res,next)=>{
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

// const notAuthenticated = (req,res,next)=>{
//     if (req.)
// }

module.exports={authenticated:authenticated}