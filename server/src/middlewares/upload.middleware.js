import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");

    return {
      folder: "delice/uploads",
      resource_type: isVideo ? "video" : "image",
      format: isVideo ? "mp4" : undefined, 
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
