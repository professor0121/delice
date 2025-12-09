import * as reelService from "../services/reel.service.js";

// Create Reel
export const createReelController = async (req, res) => {
  try {
    const reel = await reelService.createReelService({
      ...req.body,
      postedBy: req.user._id, // assuming you have auth middleware
    });
    res.status(201).json(reel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Reel by ID
export const getReelByIdController = async (req, res) => {
  try {
    const reel = await reelService.getReelByIdService(req.params.id);
    res.status(200).json(reel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllReelsController = async (req, res) => {
  try {
    // ---- Pagination ----
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ---- Filters ----
    let filter = {};

    // Business user → show only their reels
    if (req.user && req.user.accountType === "business") {
      filter.postedBy = req.user._id;
    }

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Search filter
    if (req.query.search) {
      const s = req.query.search;
      filter.$or = [
        { caption: { $regex: s, $options: "i" } },
        { hashtags: { $regex: s, $options: "i" } },
        { musicName: { $regex: s, $options: "i" } },
      ];
    }

    // Following Only
    if (req.query.following === "true") {
      if (!req.user) {
        return res.status(401).json({ message: "Login required" });
      }

      filter.postedBy = { $in: req.user.following };
    }

    // Sort
    let sort = { createdAt: -1 }; // newest first
    if (req.query.sort === "trending") {
      sort = { likesCount: -1 };
    }

    const reels = await reelService.getAllReelsService(filter, skip, limit, sort);

    res.status(200).json({
      page,
      limit,
      results: reels.length,
     reels,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Reel
export const updateReelByIdController = async (req, res) => {
  try {
    const reel = await reelService.updateReelByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json(reel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete Reel
export const deleteReelByIdController = async (req, res) => {
  try {
    const reel = await reelService.deleteReelByIdService(req.params.id);
    res.status(200).json({ message: "Reel deleted successfully", reel });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
