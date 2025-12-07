import { getProductByIdDAO } from "../dao/product.dao.js";

export const accessProduct = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    const productId = req.params.id;

    // Fetch product
    const product = await getProductByIdDAO(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const ownerId = product.addedBy._id.toString();
    // Check access
    if (userId !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this product",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
