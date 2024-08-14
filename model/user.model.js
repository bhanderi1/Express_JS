const mongoose = require("mongoose")

// mongoose Schema
const userSchema = mongoose.Schema({
    firstName : String,   //short hand property
    lastName : {
        type: String,
    },
    email:{
        type: String
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