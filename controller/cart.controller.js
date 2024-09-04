const Cart = require("../model/cart.model")
const messages = require('../helpers/messages')

exports.addtoCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
      productId: req.body.productId,
      isDelete: false,
    })
    if (cart) {
      return res.json({ message: messages.ALREADY_EXIST_CART})
    }
    cart = await Cart.create({
      user: req.user._id,
      ...req.body,
    })
    res.status(201).json({ message: messages.CART_ADDEDD, cart })
    console.log(cart);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
  }
}

exports.getAllCarts = async (req, res) => {
  try {
    let carts = await Cart.find({ user : req.user._id, isDelete: false })
    res.json(carts)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
  }
}

exports.updatecarts = async(req,res)=>{
  try{
    let cart = await Cart.findOne({_id: req.query.cartId})
    if(!cart){
      return res.status(404).json({message: messages.CART_NOT_FOUND})
    }
    let quantity = req.body.quantity += cart.quantity
    // console.log(quantity)
    cart = await Cart.findByIdAndUpdate(cart._id,{$set:req.body},{new:true})
    res.status(202).json({cart, message: messages.CART_UPDATE_SUCCESSFULLY})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
  }
}


exports.deleteCarts = async(req,res)=>{
  try{
  let cart = await Cart.findOne({_id:req.query.cartId, isDelete:false})
  if(!cart){
    return res.status(404).json({message:"cart not found"})
  }
  cart = await Cart.findByIdAndUpdate(cart._id, {isDelete:true},{new:true})
  res.status(200).json({message: messages.CART_DELETE_SUCCESSFULLY})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
  }
}

