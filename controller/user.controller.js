// const users = require('../user.json')  //=>static 
const User = require('../model/user.model')

exports.addNewUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email })
      console.log(user);
      if (user) {
         return res.status(400).json({ message: "User already exist..." })
      }
      user = await User.create(req.body)
      res.status(201).json({ user, message: "User Added Succeessfully..." })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
   }
}

exports.getAllUsers = async (req, res) => {
   try {
      let users = await User.find()
      res.status(200).json(users)
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' })
   }
}

exports.getUser = async (req, res) => {
   try {
      let user = await User.findOne({ firstName : req.query.fristName })
      // let user =await User.findOne({_id: req.query.userId})
      // let user = await User.findById(req.query.userId)
      // console.log(user);
      if (!user) {
         return res.status(404).json({ message: "User Not Found" })
      }
      res.status(200).json(user)
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Intenal server Error" })
   }
}

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