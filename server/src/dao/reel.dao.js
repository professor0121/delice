import Reel from "../models/reel.model.js";

export const createReelDAO = async (reelData) => {
  const reel = new Reel(reelData);
  return await reel.save();
};

export const getReelByIdDAO = async (id) => {
  return await Reel.findById(id)
    .populate("postedBy", "username email")
    .populate("likes", "username")
    .populate("comments");
};

export const getAllReelsDAO = async () => {
  return await Reel.find()
    .sort({ createdAt: -1 })
    .populate("postedBy", "username email");
};

export const updateReelByIdDAO = async (id, updateData) => {
  return await Reel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteReelByIdDAO = async (id) => {
  return await Reel.findByIdAndDelete(id);
};
