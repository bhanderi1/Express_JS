const express = require("express")
const userRoutes = express.Router()
const { registerUser, loginUser, getProfile, updateProfile, deleteUser, changePassword ,userShow } = require("../controller/user.controller")
const { verifyToken } = require('../helpers/verifyToken')
const { upload } = require('../helpers/imageUpload')

userRoutes.post('/register', upload.single('profileImage'), registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me', verifyToken, getProfile)
userRoutes.put('/update-profile', verifyToken, updateProfile)
userRoutes.delete('/delete-user', verifyToken, deleteUser)
userRoutes.put('/change-password', verifyToken, changePassword)
userRoutes.get('/', userShow)

module.exports = userRoutes;
