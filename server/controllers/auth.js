const jwt = require("jsonwebtoken");

module.exports={
    authenticate:(req,res,next)=>{
        const {auth}=req.headers
        console.log(req.headers)
        jwt.verify(auth, process.env.secretkey ,(err,decoded)=>{
            if(err) return res.status(202)
            else {
                next()
            }
        })
    }
}