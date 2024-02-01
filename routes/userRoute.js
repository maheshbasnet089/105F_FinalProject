const { renderRegisterForm, registerUser, renderLoginForm, loginUser } = require("../controller/user/userController")

const router = require("express").Router()

router.route("/register").get(renderRegisterForm).post(registerUser)
router.route("/login").get(renderLoginForm).post(loginUser)


module.exports = router