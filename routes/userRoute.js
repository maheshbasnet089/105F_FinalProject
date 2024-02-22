const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOutUser, forgotPassword, handleForgotPassword, renderOtpForm, verifyOtp, renderResetPassword, handleResetPassword } = require("../controller/user/userController")
const catchError = require("../services/catchError")

const router = require("express").Router()

router.route("/register").get(catchError(renderRegisterForm)).post(catchError(registerUser))
router.route("/login").get(renderLoginForm).post(catchError(loginUser))
router.route("/logout").get(logOutUser)
router.route("/forgotPassword").get(forgotPassword).post(handleForgotPassword)
router.route("/otpForm").get(renderOtpForm)
router.route("/verifyOtp/:id").post(verifyOtp)
router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:email/:otp").post(handleResetPassword)

module.exports = router