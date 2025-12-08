import express from "express";
import {
  createReelController,
  getReelByIdController,
  getAllReelsController,
  updateReelByIdController,
  deleteReelByIdController,
} from "../controllers/reels.controller.js";
import userAuthMiddleware from "../middlewares/user.middleware.js";
const router = express.Router();

// Auth required for creating, updating, deleting
router.post("/create-reel", userAuthMiddleware, createReelController);
router.get("/:id", getReelByIdController);
router.get("/", getAllReelsController);
router.put("/:id", userAuthMiddleware, updateReelByIdController);
router.delete("/:id", userAuthMiddleware, deleteReelByIdController);

export default router;
