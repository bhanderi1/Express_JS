// ****************************Lecture-1 ***************************************
const  express = require('express')


//   create server in express

 const app = express();

  app.get('/',(req, res) =>{
    res.send('welcome to express');
   res.status(200);
    res.end()
  });

  app.get('/login',(req,res) =>{
    res.json({msg:`welcom login`});
    res.end()
  });

   app.listen(8000,() =>{
    console.log('server start at  http://localhost:8000');
   });


