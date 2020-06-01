require('dotenv').config()

const express = require('express')
const {AuthenticateTokenSUPER,AuthenticateTokenAnyUser} = require('./functions/Authentication')
const cors = require('cors')
const app = express()
app.use(cors())
app.get('/api/superOnly',AuthenticateTokenSUPER,(req,res)=>{
    console.log('request was made')
    res.sendStatus(200)
})
app.get('/api/anyUser',AuthenticateTokenAnyUser,(req,res)=>{
    console.log('request was made')
    res.sendStatus(200)
})


app.listen(4000,()=>{
    
    console.log(`data provider server started on port ${4000}`)
})  