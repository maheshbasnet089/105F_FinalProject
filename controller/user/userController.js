const { users } = require("../../model")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")

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

exports.forgotPassword = (req,res)=>{
    res.render("forgotPassword")
}

exports.handleForgotPassword = async (req,res)=>{
    const {email} = req.body ; 
    if(!email){
        return res.send("Please Provide Email")
    }
    // tyo email ma otp send garney 
    const data = {
        email : email,
        subject : "Your ForgotPassword OTP",
        text : "Your OTP is : " + 123
    }
   await sendEmail(data)
   res.send("Otp sent successfully")
}