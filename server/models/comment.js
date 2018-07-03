const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'user'},
    postId:{type:Schema.Types.ObjectId, ref:'post'},
    comment_content : String,
},{timestamps:true})

mongoose.model('comment',commentSchema)

const comment = mongoose.model('comment',commentSchema)

module.exports = comment

