import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    videoUrl:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        required:false
    }],
    reelProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:false
    },

}, {timestamps:true});

const Reel = mongoose.model('Reel', reelSchema);
export default Reel;