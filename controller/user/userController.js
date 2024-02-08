const { users } = require("../../model")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}

exports.registerUser = async(req,res)=>{
 
    const {username,email,password} = req.body 
    await users.create({
        username : username,
        email : email, 
        password : bcrypt.hashSync(password,12)
    })
    res.redirect("/login")
}

exports.renderLoginForm = (req,res)=>{
    res.render("login")
}

// [] 
// ["hello"]

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body 
    if(!email || !password){
        return res.send("Please provide email and password")
    }
    // check whether the coming email user exist or not
   const user =  await users.findAll({
        where : {
            email : email
        }
    })
    if(user.length == 0 ){
       res.send("No user exist with that email")
    }else{
        // tyo email ko user xa vanney bujyo --> password pani check garney 
      const isMatched =   bcrypt.compareSync(password,user[0].password)
      if(isMatched){
       // generate token 
       var token = jwt.sign({id : user[0].id},process.env.secretKey,{
        expiresIn : '1d'
       })
       res.cookie('token',token)
       res.redirect("/")
      }else{
        res.send("Email or Password is invalid")
      }
    }
}


exports.logOutUser = (req,res)=>{
    res.clearCookie('token')
    res.redirect("/login")
}