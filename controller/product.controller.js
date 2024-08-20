// const products = require("../product.json")
const Products = require("../model/product.model")

exports.addNewProduct = async (req, res) => {
  try {
    let product = await Products.findOne({title:req.body.title , isDelete:false})
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
    let products =await Products.find(({isDelete:false}))
    res.status(200).json(products)
  }
  catch(err){
     console.log(err);
     req.status(500).json({message:"Internal server Error"})
  }
}

exports.getProduct =async (req, res) => {
  try{
    let product = await Products.findById(req.query.price)
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

exports.updateProduct = async(req,res)=>{
  try{
    let product = await Products.findById(req.query.productId)
    if(!user){
      returnres.status(404).json({message:"Product not found.."})
    }
    product = await Products.updateOne({_id:product.id},req.body , {new:true})
    res.status(202).json({product , message:'Product updated successfully...'})
  }
  catch(err){
    console.log(err);
    req.status(500).json({message:"Internal server Error"})
  }
}

exports.deleteProduct = async(req,res)=>{
  try{
    let product =await Products.findOne({_id:req.query.productId, isDelete:false})
    if(!product){
      return res.status(404).json({message:"Product not found"})
    }
    product= await Products.findByIdAndUpdate(product._id, {isDelete:true},{new:true})
    res.status(200).json({message:"Product Delete SuccessFully..."})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server Error"})
  }
}