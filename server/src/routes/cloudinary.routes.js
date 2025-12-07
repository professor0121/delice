import express from 'express'
const router=express.Router();
import {cloudinaryUpload} from '../controllers/cloudinary.controller.js'
import upload from "../middlewares/upload.middleware.js";

router.post('/upload/single',upload.single("file"),cloudinaryUpload)
router.post('/upload/gallery', upload.array("files", 10), cloudinaryUpload);

export default router;

