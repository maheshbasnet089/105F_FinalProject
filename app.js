const express = require("express")
require("dotenv").config()
const app = express()
const cookieParser = require('cookie-parser')
const blogRoute = require('./routes/blogRoute')
const userRoute = require("./routes/userRoute")


// alternative --
// const app = require("express")()
require("./model/index")
// telling nodejs to set its view engine to ejs 
app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
app.use(express.static("./uploads/"))
// app.use(express.static(__dirname+'/public/' ))
app.use(express.static("./public/styles"))


// /hello + /addBlog = /hello/addBlog 
// /hello + / = /hello/
app.use("",blogRoute)
app.use("",userRoute)


const PORT = 3000

app.listen(PORT,()=>{
    console.log(`NodeJs project has started at port ${PORT} ` )
})