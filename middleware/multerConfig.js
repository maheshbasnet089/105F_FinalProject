
const multer = require('multer')

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads") // cb(error,success) cb(error)
    },
    filename : function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})


module.exports = {
   multer,
     storage
}
