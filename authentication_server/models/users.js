const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"normal"
    }
})

const users = mongoose.model('user',Schema)

module.exports=users