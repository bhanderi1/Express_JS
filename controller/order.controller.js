const Order = require('../model/order.model')
const Cart = require('../model/cart.model')
const messages = require('../helpers/messages')

exports.addNewOrder = async (req, res) => {
    try {
        let carts = await Cart.find({
            user: req.user._id,
            isDelete: false,
        }).populate({ path: "productId" })
 
        if (carts.length === 0) {
            return res.json({ message:  messages.NO_CART_FOUND})
        }
        let orderItems = carts.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            totalPrice: item.quantity * item.productId.price
        }))
        // console.log(orderItems);

        let amount = orderItems.reduce((total, item) => total += item.totalPrice, 0)
        console.log(amount);

        let order = await Order.create({
            user: req.user._id,
            items: orderItems,
            paidAmount: amount
        })
        await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true })
        res.json({ message:  messages.ORDER_PLACES , order })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}


// let find = [
//     {
//         $match : {user:req.user._id, isDelete:false}
//     },
//     {
//         $lookup:{
//             from:"products",
//             localField: "productId",
//             foreignField: "_id",
//             as:"product"
//         }
//     }
// ]
// let carts = await Cart.aggregate(find)

exports.cancelOrder = async (req, res) => {
    try {
      let orderId =req.body._id
      if(!orderId){
        return res.status(404).json({message:"order not found"})
      }
      orderId = await Order.findByIdAndUpdate(orderId, {isDelete:true}, {new:true})
      res.status(200).json({message: "odder delete successfully..."})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.getOrder = async (req,res) => {
    try{
        let carts = await Cart.find({
            user: req.user._id,
            isDelete: false,
        })
        if (carts.length === 0) {
            return res.json({ message:  messages.NO_CART_FOUND})
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}