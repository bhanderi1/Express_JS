// ******************* Lecture-3 error-handling Middlewares, router middleware , in-bulit middleware ***********************
const  express = require('express')
const server = express() 
const morgan = require('morgan')

// server.use(morgan('dev'))
server.use(morgan('tiny'))
// server.use(morgan('combine'))

// ------------------LOGGER----------------------------------------
// const loggerFun = (req , res , next) => {
//   console.log(req.ip , req.url , req.method); 
//   next()
// }
// server.use(loggerFun)


// ----------------------------------------------------------------
// =>when express is not provided to middlewaer that time people use to body-parse
// =>body-parse use to express 4.x down version and 4 up verson express provide middleware

// => four types of the middleware 
// 1) Application-level middleware  //apply all the end points
// 2) Error-handling  middleware   // apply only fix endpoint
// 3) Built-in middleware          //bulit in middeleware there 3 types in this
//           =>1.express.json
//           =>2.express.urlencoded
//           =>3.express.static
// 4) Third-party middleware       // many  thirdparty like cookie / morgen ....


// ----------------------------------------------------------------
//------------------------ in-bulid middleware----------

server.use(express.json())   //check to postman->body->raw->jsondata
server.use(express.urlencoded({extended:false}))  ///  ody -> x-ww-form-encoded -> key-value
server.use('/hello' , express.static('public'))  
//=> public dir->index.html file run


//------------APPLICATION LEVEL MIDDELWARE FUNCTION----------------
const myFun = (req,res,next) => {
  console.log(req.body);
  next()
//   if(req.query.age >= '18'){
//     console.log('SUCESS');
//   }
//   else{
//     res.json({message:"Sorry......... "})
//   }
}
// server.use(myFun)       //application



// GET METHOD => data getting to server
server.get('/', (req ,res) => {
  res.write('Welcome to Express Server')
  res.end()
})

// -----------------ROUTER LEVEL MIDDELEWARE -------------------------
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