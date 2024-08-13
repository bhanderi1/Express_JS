// ******************* Lecture-4 CURD OPAREETION :- POST ,GET ***********************
const  express = require('express')
const morgan = require('morgan')
const app = express()
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
  res.send("welcome to express server")
})

app.use('/user',userRoutes)

app.use('/product',productRoutes)

app.listen(8000 , () => {
  console.log('Server start at http://localhost:8000');
})



//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name