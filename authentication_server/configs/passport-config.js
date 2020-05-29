const strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


const initialize =(passport,GetUser)=>{

    const authenticateUser =async(email,password,done)=>{
    const user = GetUser(email)
    if (user==null){
        done(null,false,{message:"user doesn't exist"})
    }
    if (await bcrypt.compare(password,user.password)){
        done(null,user)
    }
    else{
        done(null,false,{message:"password incorrect"})
    }
}
    passport.use(new strategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>{
         done(null,user.email)
    })
    passport.deserializeUser((email,done)=>{
        done(null,GetUser(email))
    })
}

module.exports = initialize