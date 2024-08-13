// ********************* Product Pectise ************************************
const  express = require('express')
const morgan = require('morgan')
const app = express()
const products = require("./product.json")

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
  res.send("welcome to express product prectice task.....")
})

