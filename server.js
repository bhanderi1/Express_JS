// ******************* Lecture-8 (create api)***********************
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require("mongoose")
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
  res.send("welcome to express server")
})

// user Routes
app.use('/api/user', userRoutes)

// Product Routes
app.use('/api/product', productRoutes)

app.listen(3000, () => {
  // Database connection -> mongoose function
  mongoose
    .connect("mongodb://127.0.0.1:27017/node")
    .then(() => {
      console.log("Database connection established sucess...")
    })
    .catch((err) => console.log(err));
console.log('Server start at http://localhost:3000');
})



//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name