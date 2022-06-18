const express = require('express')
const dotenv=require('dotenv').config()
const connectDB= require('./backend/config/db')

const port= process.env.PORT||5000

const app = express()
connectDB()

app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})