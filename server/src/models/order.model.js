import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['Pending','Processing','Shipped','Delivered','Cancelled'],
        default:'Pending'
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required:true
    }
}, {timestamps:true});

const Order = mongoose.model('Order', orderSchema);
export default Order;