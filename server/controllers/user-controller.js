const User=require ("../models/user")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")


module.exports={
    register:(req,res,next)=>{
        var hashpassword = bcrypt.hashSync(req.body.password,10)

        let newUser = new User({
            nama:req.body.name,
            username : req.body.username,
            password : hashpassword
        })

        newUser.save((error,user)=>{
            if(error) res.status(500).send(error)
            if(req.body.name==="" || req.body.username==="" || req.body.password=="")res.status(400).send(error)
            else{
                return res.json(user)
            }
        })
    },

    login:(req,res,next)=>{
        User.findOne({username:req.body.username},(err,result)=>{
            console.log("what result",result)
            if(err)res.status(500).json(err)
            else if(!result){
                res.status(500).json({
                    message : "User not found",
                    a: 'test'
                })
            }
            else{
                var getPassword = bcrypt.compareSync(req.body.password,result.password)
                if(getPassword){
                    const payload = {
                        username : result.username,
                        _id : result._id
                        
                    }
                    const token = jwt.sign(payload,process.env.secretkey)
                    res.json({token:token, id: result._id, token:token, nama:result.nama, username:result.username, _id:result._id})
                }else{
                    res.status(404).send('password incorrect')
                }
            }
        })
    },
    getUserByUsername:(req,res,next)=>{
        User.find({username:req.params.username})
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },
    deleteUser:(req,res,next)=>{
        User.findById(req.params.id)
        .then(user=>{
            user.remove()
            .then(userr=>{
                console.log("MASUK GA INI",userr)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })

    }
}