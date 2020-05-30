const express = require('express')
const {authenticated,notAuthenticated} = require('../functions/authentication')
const router = express()


router.get('/request',authenticated,(req,res)=>{
    res.render('requests')
})



module.exports=router