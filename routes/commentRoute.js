const { addComment, deleteComment } = require("../controller/blog/blogController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const catchError = require("../services/catchError")

const router = require("express").Router()

router.route("/comment").post(isAuthenticated,catchError(addComment))
router.route("/deletecomment/:id").get(isAuthenticated,catchError(deleteComment))


module.exports = router