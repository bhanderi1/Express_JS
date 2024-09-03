const Order = require('../model/order.model')
const Cart = require('../model/cart.model')

exports.addNewOrder = async (req, res) => {
    try {
        let carts = await Cart.find({
            user: req.user._id,
            isDelete: false,
        }).populate({ path: "productId" })

        if (carts.length === 0) {
            return res.json({ message: 'No cart Found...' })
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
        res.json({ message: 'Order Places', order })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server Error" })
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