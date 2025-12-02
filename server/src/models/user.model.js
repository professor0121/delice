import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:"",
        required:false
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],

    bio:{
        type:String,
        required:false
    },
    accountType:{
        type:String,
        enum:["Personal","Business","Admin"],
        default:"Personal"
    },
    isActivatedBusinessAccount:{
        type:Boolean,
        default:false
    },
    mobileNumber:{
        type:String,
        required:false
    },

}, {timestamps:true});
    
const User = mongoose.model('User', userSchema);
export default User;