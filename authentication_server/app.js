const express = require('express')
const router = require('./routes/router')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/superuser', {useNewUrlParser: true, useUnifiedTopology: true}) .then(()=>{
    console.log("connection is established");
}).catch((err)=>{

    console.log(err);
});

app.use(express.static(__dirname+'/views'))
app.use(router)
app.listen(3000,()=>{
    console.log('authentication server started on port 3000')
})