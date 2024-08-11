// **********************Lecture-2 (1) crud get and send***************************************
const  express = require('express')
 //create server in express
const server = express() 
// const data = require("./friends.json")

//import json file
const fs = require('fs')
const data = fs.readFileSync('./friends.json', 'utf-8')
// console.log(data);


// POST ->create
// GET -> redrive or data geting
// PUT -> updateing 
// PATCH -> data replceing
// DELETE -> data delete

// GET METHOD => data getting to server
server.get('/', (req ,res) => {
  res.write('Welcome to Express Server')
  res.end()
})
// same end point and same get method so that time alway frist code is executed
server.get('/', (req, res) =>{
  res.write('GET Method-1')
  res.end()
})

// POST METHOD 
server.post("/" , (req,res) => {
  // res.write('Welcome to post Method')
  res.send('<h1>POST METHOD</h1>')
})


// PUT METHOD
server.put("/" , (req,res) => {
  res.json({message:'Hello PUT method '})
})

// PATCH METHDO
server.patch('/' , (req,res) =>{
  res.status(400)
  res.json({message: 'Hello Patch method'})
})


server.get("/user",(req,res) =>{
  res.json(JSON.parse(data))
})

server.get("/login",(req,res) =>{
  res.write('Welcome to login page')
  res.end()
})

server.listen(8000 , () => {
  console.log('Server start at http://localhost:8000');
  
})

