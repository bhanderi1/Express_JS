const mongoose = require("mongoose")

// mongoose Schema
const productSchema = mongoose.Schema({
    title :{
        type:String,
    } ,
    price:{
        type:Number,
    },
    descripation: {
        type:String,
    } ,
    discountPercentage:{
        type:Number
    },
    category:{
        type:String,
    },
})

module.exports = mongoose.model('product', productSchema)