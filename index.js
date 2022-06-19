const express = require('express')
const dotenv=require('dotenv').config()
const morgan = require('morgan')
const connectDB= require('./backend/configs/db')
const cookieParser=require("cookie-parser")
const fileUpload=require('express-fileupload')

const port= process.env.PORT||5000

const app = express()
connectDB()

//Swagger Documentation
const swaggerUi=require("swagger-ui-express")
const YAML=require("yamljs")
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//cookies and files middlewares
app.use(cookieParser())
app.use(fileUpload())

//morgan middleware
app.use(morgan("tiny"))

//routes imports
app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})