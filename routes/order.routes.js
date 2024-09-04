const express = require("express")
const orderRoutes = express.Router()
const { addNewOrder , cancelOrder, getOrder } = require('../controller/order.controller')
const { verifyToken } = require('../helpers/verifyToken')
const { getAllCarts } = require("../controller/cart.controller")

orderRoutes.post('/', verifyToken , addNewOrder)
// orderRoutes.get('/', verifyToken , getAllCarts)


orderRoutes.delete('/', verifyToken , cancelOrder)
orderRoutes.get('/', verifyToken , getOrder)

module.exports = orderRoutes;