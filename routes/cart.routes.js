const express = require("express")
const cartRoutes = express.Router()
const {verifyToken} = require('../helpers/verifyToken');
const { addtoCart, getAllCarts, deleteCarts, updatecarts } = require("../controller/cart.controller");


cartRoutes.post("/",verifyToken, addtoCart)
cartRoutes.get("/",verifyToken, getAllCarts)
cartRoutes.put("/",verifyToken, updatecarts)
cartRoutes.delete("/",verifyToken, deleteCarts)

module.exports = cartRoutes;
