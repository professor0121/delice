import express from "express";
import {
  createReelController,
  getReelByIdController,
  getAllReelsController,
  updateReelByIdController,
  deleteReelByIdController,
} from "../controllers/reels.controller.js";
import userAuthMiddleware from "../middlewares/user.middleware.js";
import { roleAuthMiddleware } from "../middlewares/roleAuth.middleware.js";
import {accessReel} from "../middlewares/accessReels.middleware.js"
const router = express.Router();

// Auth required for creating, updating, deleting
router.post("/create-reel", userAuthMiddleware,roleAuthMiddleware("Business"), createReelController);
router.get("/:id",userAuthMiddleware, getReelByIdController);
router.get("/",userAuthMiddleware, getAllReelsController);
router.put("/:id",userAuthMiddleware,roleAuthMiddleware("Business"),accessReel, updateReelByIdController);
router.delete("/:id",userAuthMiddleware,roleAuthMiddleware("Business"),accessReel,  deleteReelByIdController);

export default router;
