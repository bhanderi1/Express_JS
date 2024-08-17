const express = require("express")
const productRotes = express.Router()
const { addNewProduct, getAllProduct, getProduct, replaceProduct, updateProduct, deleteProduct } = require("../controller/product.controller")

productRotes.post('/',addNewProduct)

productRotes.get("/",getAllProduct)

productRotes.get("/get-product" ,getProduct)

productRotes.put("/" ,updateProduct)

productRotes.delete("/" , deleteProduct)

module.exports = productRotes