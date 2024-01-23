const express = require("express")
const { blogs } = require("./model/index")
const  {storage,multer}  = require("./middleware/multerConfig")
require("dotenv").config()
const upload = multer({storage: storage})

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

app.post("/addblog",upload.single('image'),async(req,res)=>{
    console.log(process.env.name)
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
            image : process.env.backendUrl + req.file.filename
        })

        res.redirect("/")
})


// single blog
app.get("/blog/:id",async(req,res)=>{
    const id = req.params.id
    // const foundData = await blogs.findByPk(id)  returns object
    const foundData = await blogs.findAll({ // 
        where : {
            id : id
        }
    })
    console.log(foundData)
    res.render("singleBlog",{blog : foundData})
})

app.get("/delete/:id",async (req,res)=>{
    const id = req.params.id 
    await blogs.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/")
})


app.get("/update/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await blogs.findByPk(id)
    res.render("updateBlog",{id ,blog})
})

app.post("/update/:id",async(req,res)=>{
    const {id} = req.params
    const {title,subTitle,description} = req.body 
    await blogs.update({
        title : title,
        subTitle : subTitle,
        description : description
    },{
        where : {
            id : id
        }
    })
    res.redirect("/blog/" + id)

})

app.use(express.static("./uploads/"))
// app.use(express.static(__dirname+'/public/' ))
app.use(express.static("./public/"))





const PORT = 3000

app.listen(PORT,()=>{
    console.log(`NodeJs project has started at port ${PORT} ` )
})