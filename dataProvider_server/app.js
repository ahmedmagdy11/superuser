const express = require('express')
const app = express()

app.listen(4000,()=>{
    console.log(process.env.SECRET_KEY)
    console.log(`data provider server started on port ${4000}`)
})