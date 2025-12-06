import {
  createProductDAO,
  getProductByIdDAO,
  updateProductDAO,
  deleteProductDAO,
  findAllProductsDAO,
  countProductsDAO,
} from "../dao/product.dao.js";

// Create product
export const createProductService = async (bodyData) => {
  const {
    title,
    price,
    addedBy,
    stockQuantity,
  } = bodyData;

  if (!title || !price || !addedBy || !stockQuantity) {
    throw new Error("Title, price & addedBy are required fields.");
  }

  return createProductDAO(bodyData);
};

// Get all products (pagination + sorting + filters)
export const getAllProductsService = async (query) => {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    search,
    minPrice,
    maxPrice,
    discount,
    addedBy,
  } = query;

  const skip = (page - 1) * limit;

  // Advanced filters
  const filters = {};

  if (search) {
    filters.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = minPrice;
    if (maxPrice) filters.price.$lte = maxPrice;
  }

  if (discount) filters.discountPercentage = { $gte: discount };

  if (addedBy) filters.addedBy = addedBy;

  const products = await findAllProductsDAO(filters, {
    sort,
    skip,
    limit: Number(limit),
  });

  const total = await countProductsDAO(filters);

  return {
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    products,
  };
};

// Get product by ID
export const getProductByIdService = async (id) => {
  const product = await getProductByIdDAO(id);
  if (!product) throw new Error("Product not found");
  return product;
};

// Update product
export const updateProductService = async (id, data) => {
  return updateProductDAO(id, data);
};

// Delete product
export const deleteProductService = async (id) => {
  return deleteProductDAO(id);
};
