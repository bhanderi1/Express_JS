// const users = require('../user.json')  //=>static 
const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register user with profile image uploading
exports.registerUser = async (req, res) => {
   try {
      let imagePath = " "  // file not exetute path so print empty string
      let user = await User.findOne({ email: req.body.email, isDelete: false });
      if (user) {
         return res.json({ message: 'User already exist...' })
      }
      if(req.file){
         imagePath = req.file.path.replace(/\\/g ,"/")  // regx change path to beacuse mac and linex path does not to word this -> \\ and change using regx exprestion path change " / "
      }
      let hashPassword = await bcrypt.hash(req.body.password, 10)
      user = await User.create({ ...req.body, password: hashPassword  , profileImage:imagePath})
      res.status(201).json({ user, message: 'Register success...' })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}

//login user
exports.loginUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email, isDelete: false })
      if (!user) {
         return res.json({ message: 'User Not Found...' })
      }
      let comparedPassword = await bcrypt.compare(req.body.password, user.password)
      if (!comparedPassword) {
         return res.json({ message: 'Email or password does not matched...' })
      }
      let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
      console.log(token);// token genret to the console 

      res.status(200).json({ message: "Login Success...", token })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}

//get profile
exports.getProfile = async (req, res) => {
   try {
      // res.status(200).json({message: "Show user profile"})
      res.json(req.user)
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}

// update profile
exports.updateProfile = async (req, res) => {
   try {
      let user = req.user;
      user = await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true })
      res.status(202).json({ user, message: "User profile update...." })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}

// task => soft delete
exports.deleteUser = async (req, res) => {
   try {
      let user = req.user
      if (!user) {
         return res.status(404).json({ message: "user Not Found.." })
      }
      user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
      res.status(200).json({ message: 'User delete successfully...' })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}


// task => change password 
exports.changePassword = async (req, res) => {
   try {
      let user = req.user; 
      user = await User.findById(req.user._id); 
      if (!user) {
         return res.status(404).json({ message: "user Not Found.." })
      }
      
      let { oldPassword, newPassword, confirmPassword } = req.body; 
      const comparedOldPassword= await bcrypt.compare(oldPassword, user.password); 
      if (!comparedOldPassword) 
         return res.status(400).json({ message: "Please enter valid password" }); 
   
      if (oldPassword === newPassword) { 
        return res.status(400).json({  message: "Old password and new password both are the same , Please enter valid password"}); 
      } 
   
      if (newPassword !== confirmPassword) { 
        return res.status(400).json({message: "New password and confirm password do not match"}); 
      } 
   
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); 
      user = await User.findByIdAndUpdate(req.user._id, { password: hashedNewPassword }); 
   
      res.status(200).json({ message: "Password updated successfully!", user}); 
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' })
   }
}



// corrent password =>corrent password
// corrent password update operation -> new password
// new password and comfirm password