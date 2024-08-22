const express = require("express")
const userRoutes = express.Router()
const { registerUser, loginUser ,getProfile , updateProfile} = require("../controller/user.controller")
const { verifyToken }= require('../helpers/verifyToken')

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
userRoutes.get('/me',verifyToken , getProfile)     
userRoutes.put('/update-profile',verifyToken , updateProfile)     


module.exports = userRoutes;

