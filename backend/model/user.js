const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({

    firstName:{
        type: String,
    },

    lastName:{
        type: String,
    },

    email:{
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },

    password:{
        type: String,
        required: [true, "Please enter password"]
    },

    token:{
        type: String,
    }
})

const User=mongoose.model('User', userSchema)

module.exports=User