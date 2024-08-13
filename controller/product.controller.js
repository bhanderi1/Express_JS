const products = require("../product.json")

exports.addNewProduct = (req, res) => {
    products.push(req.body)
    res.json({ message: "Product added succesfully......" })
}

exports.getAllProduct = (req, res) => {
    res.json(products)
}

exports.getProduct = (req, res) => {
    let id = +req.params.id
    let item = products.find((product) => product.id === id)
    res.json(item)
} 

exports.replaceProduct = (req,res) => {
    let id = +req.params.id
    let productIndex = products.findIndex((item) => item.id === id)
    products.splice(productIndex,1,req.body)
    res.json({message : "Product Replaced Successfully....."})
  }

  exports.updateProduct = (req,res) => {
    let id = +req.params.id
    let productIndex = products.findIndex((item) => item.id === id)
    let product = products[productIndex]
    products.splice(productIndex,1, {...product , ...req.body})
    res.json({message : "Product Updated Successfully....."})
  }

  exports.deleteProduct = (req,res) => {
    let id = +req.params.id
    let productIndex = products.findIndex((item) => item.id === id)
    products.splice(productIndex,1)
    res.json({message : "Product Delete Successfully....."})
  }