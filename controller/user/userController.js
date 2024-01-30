const { users } = require("../../model")
const bcrypt  = require("bcryptjs")

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}

exports.registerUser = async(req,res)=>{
    console.log(req.body)
    const {username,email,password} = req.body 
    await users.create({
        username : username,
        email : email, 
        password : bcrypt.hashSync(password,12)
    })
    res.send("User Registered Successfully")
}