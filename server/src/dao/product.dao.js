import Product from "../models/product.model.js";

// Create
export const createProductDAO = async (productData) => {
  return Product.create(productData);
};

// Find all with filters + pagination + sorting
export const findAllProductsDAO = async (filters, options) => {
  const { sort, skip, limit } = options;

  return Product.find(filters)
    .populate("addedBy")
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Count total documents
export const countProductsDAO = async (filters) => {
  return Product.countDocuments(filters);
};

// Find one by ID
export const getProductByIdDAO = async (id) => {
  return Product.findById(id).populate("addedBy");
};

// Update
export const updateProductDAO = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete
export const deleteProductDAO = async (id) => {
  return Product.findByIdAndDelete(id);
};
