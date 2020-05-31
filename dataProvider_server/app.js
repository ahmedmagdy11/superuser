require('dotenv').config()

const express = require('express')
const AuthenticateToken = require('./functions/Authentication')
const cors = require('cors')
const app = express()
app.use(cors())
app.get('/api/superOnly',AuthenticateToken,(req,res)=>{
    console.log('request was made')
    res.send({"success":1})
})


app.listen(4000,()=>{
    
    console.log(`data provider server started on port ${4000}`)
})  