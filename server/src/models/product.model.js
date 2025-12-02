import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true   
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    productImageUrl:{
        type:String,
        required:false
    },
    productImageGalleryUrls:[{ 
        type:String,
        required:false
    }],
    
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    discountPercentage:{
        type:Number,
        required:false,
        default:0
    }
    , stockQuantity:{
        type:Number,
        required:true,
        default:0
    },

}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);
export default Product;