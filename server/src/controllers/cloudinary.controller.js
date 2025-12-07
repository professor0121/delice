// controllers/cloudinary.controller.js
export const cloudinaryUpload = async (req, res) => {
  try {
    // Single file
    if (req.file) {
      console.log("Single file upload:", req.file);
      return res.json({
        success: true,
        url: req.file.path,
        type: req.file.mimetype.startsWith("video/") ? "video" : "image",
      });
    }

    // Multiple files
    if (req.files && req.files.length > 0) {
      console.log("Multiple files upload:", req.files);
      const urls = req.files.map((f) => f.path);
      return res.json({ success: true, urls });
    }

    return res.status(400).json({ success: false, message: "No files uploaded" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export default cloudinaryUpload;
