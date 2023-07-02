 const connectToMongo = require('./db')
 const express = require('express')

 
 const app = express()
 const port = 8000
 
 connectToMongo();

 app.use(express.json())

//Available Routes
 app.get('/', (req, res)=>{
    res.send("hello")
 })
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/notes', require('./routes/notes'));
 
 app.listen(port, () => {
   console.log(`cNotebook backend listening on port http://localhost:${port}`)
 })
