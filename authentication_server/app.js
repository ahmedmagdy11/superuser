const express = require('express')
const router = require('./routes/router')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const generateKey = require('./functions/GenerateSecretKey')

const app = express()

mongoose.connect('mongodb://localhost:27017/superuser', {useNewUrlParser: true, useUnifiedTopology: true}) .then(()=>{
    console.log("connection is established");
}).catch((err)=>{

    console.log(err);
});
generateKey()

app.use(express.static(__dirname+'/views'))
app.use(express.urlencoded({extended:false}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

app.use(router)
app.listen(3000,()=>{
    console.log('authentication server started on port 3000')
})