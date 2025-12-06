import express from 'express'
const router=express.Router();
import {cloudinaryUpload} from '../controllers/cloudinary.controller.js'
import upload from "../middlewares/upload.middleware.js";

router.post('/upload',upload.single("file"),cloudinaryUpload)

export default router;

