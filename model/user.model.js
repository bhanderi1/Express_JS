const mongoose = require("mongoose")

// mongoose Schema
const userSchema = mongoose.Schema({
    // firstName : String,   //short hand property
    firstName:{
        type:String,
    },
    lastName : {
        type: String,
        unique:true,
    },
    email:{
        type: String,
        unique:true,
    },
    age:{
        type : Number
    },
    hobbies : [{type:String}],
    address:{
        line1 : String,
        line2 : String,
        pincode : Number
    }
});

module.exports = mongoose.model('users' , userSchema)

//install mongoose