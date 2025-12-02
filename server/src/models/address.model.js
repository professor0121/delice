import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    stateName: {
        type: String,
        required: true
    },
    districtName: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    permanentLocation:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });