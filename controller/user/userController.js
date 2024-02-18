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
    const userData = await users.findAll({
        where : {
            email
        }
    })
    console.log(userData)
    if(userData.length === 0){
        return res.send("No user with that email")
    }
    const generatedOtp =  Math.floor(Math.floor(10000 * Math.random(99999)))
    
    // tyo email ma otp send garney 

    const data = {
        email : email,
        subject : "Your ForgotPassword OTP",
        text : "Your OTP is : " + generatedOtp
    }
   await sendEmail(data)
    userData[0].otp = generatedOtp 
    userData[0].otpGeneratedTime = Date.now()
    await userData[0].save()
   res.redirect("/otpForm?email=" + email)
}

exports.renderOtpForm = (req,res)=>{
   const email =  req.query.email
 
    res.render("otpForm",{email : email})
}

exports.verifyOtp  = async(req,res)=>{
    const {otp} = req.body 
    const email = req.params.id
 
    const data = await users.findAll({
        where : {
            otp : otp,
            email : email
        }
    })
    if(data.length === 0 ){
        return res.send("Invalid Otp")
    }
    const currentTime = Date.now()
    const otpGeneratedTime = data[0].otpGeneratedTime
    if(currentTime - otpGeneratedTime <= 120000 ){
        
        res.redirect(`/resetPassword?email=${email}&otp=${otp}`)
    }else{
        res.send("OTP has expired")
    }
}

exports.renderResetPassword = (req,res)=>{
    const {email,otp} = req.query
    if(!email || !otp){
        return res.send("Please provide email and otp")
    }
    res.render("resetPassword",{email,otp})
}

exports.handleResetPassword = async(req,res)=>{
    const email = req.params.email 
    const otp = req.params.otp
    const {newPassword,newPasswordConfirm} = req.body 
    if(!email || !otp || !newPassword || !newPasswordConfirm){
        return res.send("Please provide email,otp,newPassword,newPasswordConfirm")
    }
    if(newPassword !== newPasswordConfirm){
        return res.send("New password and new password confirm should be same")
    }
    const userData = await users.findAll({
        where : {
            email ,
            otp
        }
    })

    const currentTime = Date.now()
    const otpGeneratedTime = userData[0].otpGeneratedTime
    if(currentTime - otpGeneratedTime <= 120000 ){
            await users.update({
                password : bcrypt.hashSync(newPassword,8)
            },{
                where : {
                    email : email
                }
            })
        res.redirect("/login")
    }else{
        res.send("OTP has expired")
    }

    
}