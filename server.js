// ******************* Lecture-18 (Cart model)  ***********************
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
const ejs = require('ejs');
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

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
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)


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





//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name

