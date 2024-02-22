const catchError = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            res.send(err.message)
        })
    }
}

module.exports = catchError