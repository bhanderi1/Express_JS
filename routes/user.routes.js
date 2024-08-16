const express = require("express")
const userRoutes = express.Router()
const { addNewUser, getAllUsers, getUser, replaceUser, updateUser, deleteUser } = require("../controller/user.controller")

//CRUD
//create user
userRoutes.post("/",addNewUser)

// READ -Get All users
userRoutes.get("/", getAllUsers)

// //Get single User
userRoutes.get("/get-user", getUser)

// Replace Data - PUT
// userRoutes.put("/", replaceUser)

// userRoutes.delete("/", deleteUser)

module.exports = userRoutes;

