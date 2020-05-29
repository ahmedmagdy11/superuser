const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:Boolean,
        default:false
    }
})

const users = mongoose.model('user',Schema)

module.exports=users