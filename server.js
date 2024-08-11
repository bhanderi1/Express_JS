// ******************* Lecture-4 CURD OPAREETION :- POST ,GET ***********************
const  express = require('express')
const morgan = require('morgan')
const app = express()
const users = require('./friends.json')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
  res.send("welcome to express server")
})

//CRUD
//create 8user
app.post("/users" ,(req,res)=>{
  // console.log(req.body);
  users.push(req.body)
  res.json({message:"User added sucessfully......"})  
})

// READ -Get All users
// -> first of all get run and than post method run to localhost/user => reply aaded msg after that open new tab in post man and get localhost/user => display aaed person and than single argemnet  localhost/user/11
app.get("/users",(req,res) =>{
  res.json()
})

//Get single User
app.get("/users/:id" , (req,res) =>{
  let id = +req.params.id;
  let item = users.find((user)=> user.is === id)
  res.json(item)
})

// Replace Data - PUT
app.put("/users/:id",(req,res)=>{
  let id = +req.params.id;
  let userIndex = users.findIndex((item) => item.id === id)
  users.splice(userIndex,1 , req.body)
  res.json({message : "User Replaced Success"})
})


// Update Data - PATCH
app.patch("/users/:id",(req,res)=>{
  let id = +req.params.id;
  let userIndex = users.findIndex((item) => item.id === id)
  let user = users[userIndex]
  users.splice(userIndex,1 , {...user ,...req.body})
  res.json({message : "User update Success"})
})


//Delete Data - DELETE
app.delete("/users/:id",(req,res)=>{
  let id = +req.params.id;
  let userIndex = users.findIndex((item) => item.id === id)
  let user = users[userIndex]
  users.splice(userIndex,1)
  res.json({message : "User delete Success"})
})



app.listen(8000 , () => {
  console.log('Server start at http://localhost:8000');
})



//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name