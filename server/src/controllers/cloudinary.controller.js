import express from "express";
// import cloudinary from "../config/cloudinary.config.js";

const router = express.Router();

// For image/video upload
export const cloudinaryUpload = async (req, res) => {
  try {
    return res.json({
      success: true,
      url: req.file.path,
      type: req.file.mimetype.startsWith("video/") ? "video" : "image",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export default router;
