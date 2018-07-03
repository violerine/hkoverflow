const mongoose = require ("mongoose")
const Schema = mongoose.Schema
const Post = require ("./post")

const userSchema = new Schema({
    nama:{type:String,required:true},
    username : {type:String,unique:true,maxlength:40, required:true},
    password : {type:String,required:true}
})

userSchema.pre('remove',function(next){
    Post.remove({})
    .then(post=>{
        next()
    })
    .catch(err=>{
        console.log(err)
    })
})




const User = mongoose.model('user',userSchema)

module.exports=User