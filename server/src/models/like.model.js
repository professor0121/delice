import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reel',
        required:true
    },
    likeCount:{
        type:Number,
        default:0
    }
}, {timestamps:true});

const Like = mongoose.model('Like', likeSchema);
export default Like;