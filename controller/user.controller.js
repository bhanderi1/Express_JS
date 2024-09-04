// const users = require('../user.json')  //=>static 
const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const messages = require('../helpers/messages')

//register user with profile image uploading
exports.registerUser = async (req, res) => {
   try {
      let imagePath = " "  // file not exetute path so print empty string
      let user = await User.findOne({ email: req.body.email, isDelete: false });
      if (user) {
         return res.json({ message: messages.USER_ALREADY_EXIST })
      }
      if (req.file) {
         imagePath = req.file.path.replace(/\\/g, "/")  // regx change path to beacuse mac and linex path does not to word this -> \\ and change using regx exprestion path change " / "
      }
      let hashPassword = await bcrypt.hash(req.body.password, 10)
      user = await User.create({ ...req.body, password: hashPassword, profileImage: imagePath })
      res.status(201).json({ user, message: messages.REGISTER_SUCCESSFULLY })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}

//login user
exports.loginUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email, isDelete: false })
      if (!user) {
         return res.json({ message: messages.USER_NOT_FOUND })
      }
      let comparedPassword = await bcrypt.compare(req.body.password, user.password)
      if (!comparedPassword) {
         return res.json({ message: 'Email or password does not matched...' })
      }
      let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
      console.log(token);// token genret to the console 

      res.status(200).json({ message: messages.LOGIN_SUCCESSFULLY, token })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
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
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}

// update profile
exports.updateProfile = async (req, res) => {
   try {
      let user = req.user;
      user = await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true })
      res.status(202).json({ user, message: messages.USER_PROFILE_UPDATE })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}

// task => soft delete
exports.deleteUser = async (req, res) => {
   try {
      let user = req.user
      if (!user) {
         return res.status(404).json({ message: messages.USER_NOT_FOUND })
      }
      user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
      res.status(200).json({ message: messages.USER_DELETE_SUCCESFULLY })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}


// task => change password 
exports.changePassword = async (req, res) => {
   try {
      let user = req.user;
      user = await User.findById(req.user._id);
      if (!user) {
         return res.status(404).json({ message: messages.USER_NOT_FOUND })
      }

      let { oldPassword, newPassword, confirmPassword } = req.body;
      const comparedOldPassword = await bcrypt.compare(oldPassword, user.password);
      if (!comparedOldPassword)
         return res.status(400).json({ message: messages.PLEASE_ENTER_VALID_PASSWORD });

      if (oldPassword === newPassword) {
         return res.status(400).json({ message: messages.OLD_AND_NEW_PASSWORD_NOT_MATCH });
      }

      if (newPassword !== confirmPassword) {
         return res.status(400).json({ message: messages.NEW_AND_CONFIRM_PASSWORD_NOT_MATCH });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user = await User.findByIdAndUpdate(req.user._id, { password: hashedNewPassword });

      res.status(200).json({ message: messages.PASSWORD_UPDATE_SUCCESSFULLY, user });
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}
// corrent password =>corrent password
// corrent password update operation -> new password
// new password and comfirm password

exports.userShow = async (req, res) => {
   try {
      // let user ={
      //    firstName : 'sachin',
      //    lastName : 'Tendulkar',
      //    age: 40,
      //    email : 'schin@text.in',
      //    mobileNo : '1234567890',
      //    hobbies: ['sport','music','Dance','cricket']
      // }
      let user = await User.findOne({ firstName: req.query.name, isDelete: false })
      if (!user) {
         return res.render('notfound.ejs')
      }
      res.render('student.hbs', { user })
      // res.render('user.ejs',{user})
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
   }
}