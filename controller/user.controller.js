// const users = require('../user.json')  //=>static 
const User = require('../model/user.model')

exports.addNewUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email  , isDelete:false})
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
      let users = await User.find({isDelete:false})
      res.status(200).json(users)
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' })
   }
}

exports.getUser = async (req, res) => {
   try {
      // let user = await User.findOne({ firstName : req.query.firstName })
      // let user =await User.findOne({_id: req.query.userId}) 
      let user = await User.findById(req.query.userId)  //this method provaided by mongoose
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

exports.updateUser = async(req,res)=>{
   try{
      let user = await User.findById(req.query.userId)
      if(!user){
         return res.status(404).json({message:"user not found"})
      }
      user = await User.updateOne({_id: user.id},req.body,{new:true})
      // user = await User.findOneAndUpdate({_id:user._id},req.body,{new:true}) //this method provide by mongoose
      // user = await User.findByIdAndUpdate(user._id,{$set:req.body},{new:true})
      res.status(202).json({user , message:'User updated successfully...'})
   }
   catch(err){
     console.log(err);
     req.status(500).json({message:"Internal server Error"})
   }
}

// soft delete => user feeled data to the delete but data is saved to the server and most priority to soft delete used to devloper
exports.deleteUser = async(req,res)=>{
   try{
      let user = await User.findOne({_id:req.query.userId , isDelete:false})
      if(!user){
         return res.status(404).json({message:"User not found"})
      }
      user= await User.findByIdAndUpdate(user._id, {isDelete:true},{new:true}) //this method provided by mongoose
      res.status(200).json({message:'User Delete successfully...'})
   }
   catch(err){
      console.log(err);
      res.status(500).json({message:"Internal server Error"})
   }
}