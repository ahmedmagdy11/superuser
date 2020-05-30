const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true
    }
})

const Tokens = mongoose.model('token',TokenSchema)

module.exports = Tokens