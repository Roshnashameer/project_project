// load env file
require('dotenv').config()
// import express 
const express=require('express')
const cors=require('cors')

const routes=require('./Routes/routes')
require('./db/connection')
// create server using express
const projectServer=express()
projectServer.use(cors())
// covert all incoming json data to js data
projectServer.use(express.json())

projectServer.use(routes)

// export uploads folder  to client
projectServer.use('/uploads',express.static('./uploads'))

const PORT=4000 || process.env.PORT
projectServer.listen(PORT,()=>{
    console.log(`________Project server started at ${PORT}___`);
})
projectServer.get('/',(req,res)=>{
    res.send('<h1>Project server started</h1>')
})
projectServer.post('/',(req,res)=>{
    res.send('Post Method...')
})
