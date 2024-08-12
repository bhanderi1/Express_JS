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

app.post('/products',(req,res)=>{
  products.push(req.body)
  res.json({message:"Product added succesfully......"})
})

app.get("/products",(req,res) =>{
  res.json(products)
})

app.get("/products/:id" ,(req,res) => {
  let id = +req.params.id
  let item = products.find((product) => product.id === id)
  res.json(item)
})

app.put("/products/:id" ,(req,res) => {
  let id = +req.params.id
  let productIndex = products.findIndex((item) => item.id === id)
  products.splice(productIndex,1,req.body)
  res.json({message : "Product Replaced Successfully....."})
})

app.patch("/products/:id" ,(req,res) => {
  let id = +req.params.id
  let productIndex = products.findIndex((item) => item.id === id)
  let product = products[productIndex]
  products.splice(productIndex,1, {...product , ...req.body})
  res.json({message : "Product Updated Successfully....."})
})

app.delete("/products/:id" ,(req,res) => {
  let id = +req.params.id
  let productIndex = products.findIndex((item) => item.id === id)
  products.splice(productIndex,1)
  res.json({message : "Product Delete Successfully....."})
})

app.listen(4000,() => {
  console.log(`server start at http://localhost:4000`);
  
})