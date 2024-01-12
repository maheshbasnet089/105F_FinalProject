const express = require("express")
const app = express()

// alternative --
// const app = require("express")()

// telling nodejs to set its view engine to ejs 
app.set('view engine','ejs')

// HOME PAGE 
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/about",(req,res)=>{
    res.render("about")
})




const PORT = 3000

app.listen(PORT,()=>{
    console.log(`NodeJs project has started at port ${PORT} ` )
})