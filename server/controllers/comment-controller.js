const Comment = require ('../models/comment')

module.exports={

    getCommentByPostId:(req,res,next)=>{
        Comment.find({"postId":req.params.postid})
        .sort({createdAt:'desc'})
        .populate('userId')
        .populate('postId')
        .exec()
        .then(comment=>{
            res.status(200).json(comment)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).send(err)
        })
    },

    newComment:(req,res,next)=>{
        let newComment = new Comment({
            userId:req.body.userid,
            postId:req.body.postid,
            comment_content:req.body.content
        })

        newComment.save()
        .then(comment=>{
            res.status(200).json(comment)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    deleteComment:(req,res,next)=>{
        Comment.findByIdAndRemove(req.params.id)
        .then(comment=>{
            res.status(200).json(comment)
            console.log(comment)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }

}