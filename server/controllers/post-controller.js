const Post = require ('../models/post')
const mongoose = require('mongoose')

module.exports={
    getAllPosts:(req,res,next)=>{
        Post.find({})
        .sort({createdAt:'desc'})
        .then(post=>{
            console.log("post",post)
            res.status(200).json(post)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    getPostById:(req,res,next)=>{
        Post.findById(req.params.id)
        .then(post=>{
           res.status(200).json(post)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },  
    getPostByUserId:(req,res,next)=>{
        Post.find({"userId":req.params.userid})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(post=>{
            res.status(200).json(post)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },
    addNewPost:(req,res)=>{
        let newPost = new Post({
            userId: req.body.userid,
            title:req.body.title,
            content:req.body.content,
        })
        newPost.save((error,post)=>{
            if(error) res.status(500).send(error)
            else{
                return res.status(200).json(post)
            }
        })
    },
    deletePost:(req,res,next)=>{
        Post.findById(req.params.id)
        .then(post=>{
            post.remove()
            .then(userr=>{
                res.status(200).json(userr)
            })
            .catch(err=>{
                res.status(400).send(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })

    },
    addLike:(req,res,next)=>{
        Post.findById(req.params.id)
        .then(postFound=>{
            console.log("PostFound",postFound)
            var findUser=postFound.likes.indexOf(req.body.userid)
            var findUserDislike=postFound.dislikes.indexOf(req.body.userid)
           
            // if(findUserDislike!==-1 && findUser==-1){
                
            //     postFound.likes.push(mongoose.Types.ObjectId(req.body.userid))
            //     postFound.save(error=>{
            //         if(error) res.status(400).json({
            //             msg:"terjadi kesalahan",
            //             error
            //         })
            //         res.status(200).json({
            //             msg:'berhasil masuk dalam liked post!'
            //         })
            //     })
            // }
            if(findUser==-1){
                console.log("DISLIKE",findUserDislike)
                postFound.likes.push(mongoose.Types.ObjectId(req.body.userid))
                postFound.save(error=>{
                    if(error) res.status(400).json({
                        msg:"terjadi kesalahan",
                        error
                    })
                    res.status(200).json({
                        msg:'berhasil masuk dalam liked post!'
                    })
                })
            }
            else{
                next()
            }
            
        })
        .catch(error=>{
            console.log(error)
            res.status(400).send(error)
        })
    },
    removeLike:(req,res)=>{
        Post.update({_id: req.params.id}, { $pull: { likes: req.body.userid } }, { multi: true })
        .then(()=>{
            res.status(200).json({
                msg:'data berhasil dikeluarkan dari liked post!'
            })
        })
        .catch(error=>{
            res.status(400).json({
                msg:'terjadi kesalahan',
                error
            })
        })
    },
    addDislike:(req,res,next)=>{
        Post.findById(req.params.id)
        .then(postFound=>{
            console.log("PostFound",postFound)
            var findUser=postFound.dislikes.indexOf(req.body.userid)
            if(findUser==-1){
                postFound.dislikes.push(mongoose.Types.ObjectId(req.body.userid))
                postFound.save(error=>{
                    if(error) res.status(400).json({
                        msg:"terjadi kesalahan",
                        error
                    })
                    res.status(200).json({
                        msg:'berhasil masuk dalam disliked post!'
                    })
                })
            }else{
                next()
            }
            
        })
        .catch(error=>{
            console.log(error)
            res.status(400).send(error)
        })
    },
    removeDislike:(req,res)=>{
        Post.update({_id: req.params.id}, { $pull: { dislikes: req.body.userid } }, { multi: true })
        .then(()=>{
            res.status(200).json({
                msg:'data berhasil dikeluarkan dari dis liked post!'
            })
        })
        .catch(error=>{
            res.status(400).json({
                msg:'terjadi kesalahan',
                error
            })
        })
    },
    
}