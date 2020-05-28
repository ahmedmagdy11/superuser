const express = require('express')
const router = express()


router.get('/',(req,res)=>{
    
    res.sendFile(__dirname.replace('routes','views/index.html'))
})


module.exports = router