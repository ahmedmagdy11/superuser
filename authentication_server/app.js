const express = require('express')
const router = require('./routes/router')
const app = express()

app.use(express.static(__dirname+'/views'))
app.use(router)
app.listen(3000,()=>{
    console.log('authentication server started on port 3000')
})