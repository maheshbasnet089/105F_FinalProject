const { blogs } = require("../../model")

exports.renderHome =  async (req,res)=>{
    // blogs table bata data(row) nikalnu paryo ani home page lai pass garnu paryo 
   const blogsTableBlogs =  await blogs.findAll() 
   
    res.render("home",{blogs : blogsTableBlogs})
}

exports.renderAddBlog = (req,res)=>{
    res.render("addBlog")
}

exports.addBlog = async(req,res)=>{
    const {userId} = req
    
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
            image : process.env.backendUrl + req.file.filename,
            userId : userId
        })

        res.redirect("/")
}

exports.renderSingleBlog = async(req,res)=>{
    const id = req.params.id
    // const foundData = await blogs.findByPk(id)  returns object
    const foundData = await blogs.findAll({ // 
        where : {
            id : id
        }
    })
    console.log(foundData)
    res.render("singleBlog",{blog : foundData})
}

exports.deleteBlog = async (req,res)=>{
    const id = req.params.id 
    await blogs.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/")
}

exports.renderUpdateBlog = async (req,res)=>{
    const id = req.params.id
    const blog = await blogs.findByPk(id)
    res.render("updateBlog",{id ,blog})
}

exports.updateBlog = async(req,res)=>{
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

}