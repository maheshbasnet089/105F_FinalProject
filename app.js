const express = require("express")
const { blogs } = require("./model/index")
const app = express()

// alternative --
// const app = require("express")()
require("./model/index")
// telling nodejs to set its view engine to ejs 
app.set('view engine','ejs')

app.use(express.urlencoded({extended : true}))


// HOME PAGE 
app.get("/",async (req,res)=>{
    // blogs table bata data(row) nikalnu paryo ani home page lai pass garnu paryo 
   const blogsTableBlogs =  await blogs.findAll() 
   
    res.render("home",{blogs : blogsTableBlogs})
})

app.get("/addblog",(req,res)=>{
    res.render("addBlog")
})

app.get("/blogs",async(req,res)=>{
   const blogsData = await blogs.findAll()
    res.send("Data will show here ")
})

app.post("/addblog",async(req,res)=>{


    // const title = req.body.title 
    // const subTitle = req.body.subTitle 
    // const description = req.body.description
    const {title,subTitle,description} = req.body
    if(!title || !subTitle || !description){
        return res.send("Please provide title, subtitle,description")
    }
    
    // inserting into blogs tables 
       await blogs.create({
           subTitle : subTitle, 
           description :description,
            title : title,
        })

        res.redirect("/")
})




const PORT = 3000

app.listen(PORT,()=>{
    console.log(`NodeJs project has started at port ${PORT} ` )
})