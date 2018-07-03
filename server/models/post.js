const mongoose = require ("mongoose")
const Schema = mongoose.Schema
// var timestamps = require('mongoose-timestamp');
const CommentPost = require ("./comment")

const postSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'User'},
    title:String,
    content:String,
    likes: [{ type:Schema.Types.ObjectId, ref: 'User' }],
    dislikes:[{ type:Schema.Types.ObjectId, ref: 'User' }]
},{timestamps:true})

postSchema.pre('remove',function(next){
    CommentPost.remove({})
    .then(post=>{
        next()
    })
    .catch(err=>{
        console.log(err)
    })
})

mongoose.model('post',postSchema);

const Post = mongoose.model('post',postSchema)

module.exports=Post