// redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

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
  success: boolean;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/products/create-product", payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Product create failed"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
