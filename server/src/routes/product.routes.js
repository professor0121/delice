import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import userAuthMiddleware from "../middlewares/user.middleware.js";
import { roleAuthMiddleware } from "../middlewares/roleAuth.middleware.js";
import { accessProduct } from "../middlewares/accessProduct.middleware.js";

const router = express.Router();

router.post("/create-product",userAuthMiddleware,roleAuthMiddleware("Business"), createProduct);
router.get("/:id",userAuthMiddleware, getProductById);
router.put("/:id", userAuthMiddleware,accessProduct,updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", userAuthMiddleware,getAllProducts);

export default router;
