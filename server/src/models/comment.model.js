import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reel',
        required:true
    }
    
}, {timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;