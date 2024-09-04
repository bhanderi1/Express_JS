// const products = require("../product.json")
const Products = require("../model/product.model")
const ProductServices = require('../services/product.service')
const messages = require('../helpers/messages')

exports.addNewProduct = async (req, res) => {
  try {
    let product = await ProductServices.getProduct({ title: req.body.title, isDelete: false })  ///services folder
    if (product) {

      return res.status(400).json({ message: messages.ALREADY_EXIST_PRODUCT})   //message for services 
    }
    product = await ProductServices.addNewProduct(req.body)
    res.status(201).json({ product, message: messages.ADD_NEW_PRODUCT })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR})
  }
}

exports.getAllProduct = async (req, res) => {
  try {
    let products = await ProductServices.find(({ isDelete: false }))
    res.status(200).json(products)
  }
  catch (err) {
    console.log(err);
    req.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
  }
}

exports.getProduct = async (req, res) => {
  try {
    let product = await ProductServices.findById(req.query.price)
    if (!product) {
      return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND})
    }
    res.status(200).json(product)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR})
  }
}

exports.updateProduct = async (req, res) => {
  try {
    let product = await ProductServices.findById(req.query.productId)
    if (!product) {
      returnres.status(404).json({ message: messages.PRODUCT_NOT_FOUND })
    }
    product = await Products.updateOne({ _id: product.id }, req.body, { new: true })
    res.status(202).json({ product, message: messages.PRODUCT_UPDATE_SUCCESSFULLY })
  }
  catch (err) {
    console.log(err);
    req.status(500).json({ message: messages.INTERNAL_SERVER_ERROR})
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    let product = await ProductServices.findById({ _id: req.query.productId, isDelete: false })
    if (!product) {
      return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND })
    }
    product = await ProductServices.findAndUpdateId(product._id, { isDelete: true }, { new: true })
    res.status(200).json({ message:  messages.PRODUCT_DELETE_SUCCESSFULLY})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR})
  }
}