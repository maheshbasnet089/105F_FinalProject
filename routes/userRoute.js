const { renderRegisterForm, registerUser } = require("../controller/user/userController")

const router = require("express").Router()

router.route("/register").get(renderRegisterForm).post(registerUser)


module.exports = router