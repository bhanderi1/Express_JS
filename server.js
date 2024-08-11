// ******************* Lecture-2 (2) Middlewares  ***********************
const  express = require('express')
 //create server in express
const server = express() 


//APPLICATION LEVEL MIDDELWARE FUNCTION
const myFun = (req,res,next) => {
  if(req.query.age >= '18'){
    console.log('SUCESS');
  }
  else{
    res.json({message:"Sorry......... "})
  }
}
server.use(myFun)       //application

// GET METHOD => data getting to server
server.get('/', (req ,res) => {
  res.write('Welcome to Express Server')
  res.end()
})

server.get("/login",myFun ,(req,res) =>{
  res.write('Welcome to login page')
  res.end()
})

// POST METHOD 
server.post("/" , (req,res) => {
  // res.write('Welcome to post Method')
  res.send('<h1>POST METHOD</h1>')
})



server.listen(8000 , () => {
  console.log('Server start at http://localhost:8000');
  
})


//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name