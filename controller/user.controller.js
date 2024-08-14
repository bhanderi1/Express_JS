// const users = require('../user.json')
const User = require('../model/user.model')


exports.addNewUser = async (req, res) => {
   try{
    const user = await User.create(req.body)
    res.status(201).json({user,message : "User Added Succeessfully..."})
   }
   catch(err){
    console.log(err);
    res.status(500).json({message : "Internal Server Error"})
   }
}

// exports.getAllUsers = (req, res) => {
//     res.json(users)
// }

// exports.getUser = (req, res) => {
//     let id = +req.params.id;
//     let item = users.find((user) => user.id === id)
//     res.json(item)
// }

// exports.replaceUser = (req, res) => {
//     let id = +req.params.id;
//     let userIndex = users.findIndex((item) => item.id === id)
//     users.splice(userIndex, 1, req.body)
//     res.json({ message: "User Replaced Success" })
// }

// exports.updateUser = (req, res) => {
//     let id = +req.params.id;
//     let userIndex = users.findIndex((item) => item.id === id)
//     let user = users[userIndex]
//     users.splice(userIndex, 1, { ...user, ...req.body })
//     res.json({ message: "User update Success" })
// }

// exports.deleteUser = (req, res) => {
//     let id = +req.params.id;
//     let userIndex = users.findIndex((item) => item.id === id)
//     users.splice(userIndex, 1)
//     res.json({ message: "User delete Success" })
// }