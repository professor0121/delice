import { getReelByIdDAO } from "../dao/reel.dao.js";

export const accessReel = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const reelId = req.params.id;

    // Fetch reel
    const reel = await getReelByIdDAO(reelId);
    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "Reel not found",
      });
    }

    const ownerId = reel.postedBy._id.toString();

    // Check access
    if (userId !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this reel",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
