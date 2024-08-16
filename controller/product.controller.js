// const products = require("../product.json")
const Products = require("../model/product.model")

exports.addNewProduct = async (req, res) => {
  try {
    const product = await Products.findOne({title:req.body.title})
    if (product) {
      return res.status(400).json({ message: "Product already exist..." })
    }
    product = await Products.create(req.body)
    res.status(201).json({ product, message: "Product added succesfully......" })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" })

  }
}

exports.getAllProduct = async(req, res) => {
  try{
    let products =await Products.find()
    res.status(200).json(products)
  }
  catch(err){
     console.log(err);
     req.status(500).json({message:"Internal server Error"})
  }
}

exports.getProduct =async (req, res) => {
  try{
    let product = await Products.findOne({price:req.query.price})
    if(!product){
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(product)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"})
  }
}

// exports.replaceProduct = (req,res) => {
//     let id = +req.params.id
//     let productIndex = products.findIndex((item) => item.id === id)
//     products.splice(productIndex,1,req.body)
//     res.json({message : "Product Replaced Successfully....."})
//   }

//   exports.updateProduct = (req,res) => {
//     let id = +req.params.id
//     let productIndex = products.findIndex((item) => item.id === id)
//     let product = products[productIndex]
//     products.splice(productIndex,1, {...product , ...req.body})
//     res.json({message : "Product Updated Successfully....."})
//   }

//   exports.deleteProduct = (req,res) => {
//     let id = +req.params.id
//     let productIndex = products.findIndex((item) => item.id === id)
//     products.splice(productIndex,1)
//     res.json({message : "Product Delete Successfully....."})
//   }