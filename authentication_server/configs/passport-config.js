const strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


const initialize =(passport,GetUserByEmail,GetUserByID)=>{
    
    const authenticateUser =async(email,password,done)=>{
    
    const user = await GetUserByEmail(email)
    
   try{
    if (user==null){
        done(null,false,{message:"user doesn't exist"})
    }
    
    else if (await bcrypt.compare(password,user.password)){
        done(null,user,{message:user})
    }
    else{
        done(null,false,{message:"password incorrect"})
    }
   } catch(error){
        console.log(error)
   }
}

    passport.use(new strategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>{
        
         done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        
        done(null,await GetUserByID(id))
    })
}

module.exports = initialize