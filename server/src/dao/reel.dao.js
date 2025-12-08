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

export const getAllReelsDAO = async (filter, skip, limit, sort) => {
  return await Reel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};



export const updateReelByIdDAO = async (id, updateData) => {
  return await Reel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteReelByIdDAO = async (id) => {
  return await Reel.findByIdAndDelete(id);
};
