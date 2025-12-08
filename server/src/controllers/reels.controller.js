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

// Get All Reels
export const getAllReelsController = async (req, res) => {
  try {
    const reels = await reelService.getAllReelsService();
    res.status(200).json(reels);
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
