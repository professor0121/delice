import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// --------------------------------------------------
// TYPES
// --------------------------------------------------
export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  productImageUrl: string;
  productImageGalleryUrls: string[];
  addedBy: string;
  discountPercentage: number;
  stockQuantity: number;
}

export interface ProductState {
  loading: boolean;
  listLoading: boolean;
  success: boolean;
  error: string | null;

  products: any[];
  product: any | null;
}

// --------------------------------------------------
// INITIAL STATE
// --------------------------------------------------
const initialState: ProductState = {
  loading: false,
  listLoading: false,
  success: false,
  error: null,

  products: [],
  product: null,
};

// --------------------------------------------------
// ASYNC THUNKS
// --------------------------------------------------

// ---------- CREATE ----------
export const createProduct = createAsyncThunk(
  "product/create",
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/products/create-product", payload);
      return data.product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// ---------- GET ALL ----------
export const getProducts = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/products/");
      return data.products;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// ---------- GET ONE ----------
export const getProductById = createAsyncThunk(
  "product/getOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data.product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch single failed");
    }
  }
);

// ---------- DELETE ----------
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ---------- UPDATE ----------
export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    { id, data }: { id: string; data: Partial<ProductPayload> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/products/${id}`, data);
      return res.data.product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// --------------------------------------------------
// SLICE
// --------------------------------------------------
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.success = false;
      state.error = null;
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ----- CREATE -----
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ----- GET ALL -----
      .addCase(getProducts.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.listLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload as string;
      })

      // ----- GET ONE -----
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ----- DELETE -----
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })

      // ----- UPDATE -----
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
