const { renderHome, renderAddBlog, addBlog, renderSingleBlog, deleteBlog, renderUpdateBlog, updateBlog } = require("../controller/blog/blogController")
const  {storage,multer}  = require("../middleware/multerConfig")
const router = require("express").Router()

const upload = multer({storage: storage})

router.route('/').get(renderHome)
router.route("/addblog").get(renderAddBlog).post(upload.single('image'),addBlog)
router.route("/blog/:id").get(renderSingleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/update/:id").get(renderUpdateBlog).post(updateBlog)


module.exports = router 