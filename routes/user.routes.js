const express = require("express")
const userRoutes = express.Router()
const { registerUser, loginUser ,getProfile , updateProfile ,deleteUser, changePassword} = require("../controller/user.controller")
const { verifyToken }= require('../helpers/verifyToken')

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
userRoutes.get('/me',verifyToken , getProfile)     
userRoutes.put('/update-profile',verifyToken , updateProfile)   
userRoutes.delete('/delete-user',verifyToken, deleteUser)  
userRoutes.put('/change-password', verifyToken, changePassword)


module.exports = userRoutes;

