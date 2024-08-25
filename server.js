// ******************* Lecture-15 (Viwe localhost url in font side data using ejs and hbs)  ***********************
require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require("mongoose")
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const port = process.env.PORT;
const cors = require('cors')
const path = require('path')
const ejs = require('ejs')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/public/images",express.static(path.join(__dirname, "public/images")))

app.set("viwe enggine" , 'ejs')

app.get("/", (req, res) => {
  res.send("welcome to express server")
})

// user Routes
app.use('/api/user', userRoutes)

// Product Routes
app.use('/api/product', productRoutes)

app.listen(port, () => {
  // Database connection -> mongoose function
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connection established sucess...")
    })
    .catch((err) => console.log(err));
console.log(`Server start at http://localhost:${port}`);
})


// -------------------Today task --------------------------
// Delete User        
//Change passWord
//Forget passWord => otp genreate => email(nodemailer) / message




//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name

