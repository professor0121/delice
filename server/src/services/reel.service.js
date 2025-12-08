import * as reelDAO from "../dao/reel.dao.js";

export const createReelService = async (reelData) => {
  // add any extra logic here if needed
  return await reelDAO.createReelDAO(reelData);
};

export const getReelByIdService = async (id) => {
  const reel = await reelDAO.getReelByIdDAO(id);
  if (!reel) throw new Error("Reel not found");
  return reel;
};

export const getAllReelsService = async (filter, skip, limit, sort) => {
  return await reelDAO.getAllReelsDAO(filter, skip, limit, sort);
};


export const updateReelByIdService = async (id, updateData) => {
  const reel = await reelDAO.updateReelByIdDAO(id, updateData);
  if (!reel) throw new Error("Reel not found");
  return reel;
};

export const deleteReelByIdService = async (id) => {
  const reel = await reelDAO.deleteReelByIdDAO(id);
  if (!reel) throw new Error("Reel not found");
  return reel;
};
