import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

interface BusinessState {
  activationStatus: "NotActivated" | "Requested" | "Activated";
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  activationStatus: "NotActivated",
  loading: false,
  error: null,
};

// 🔥 SEND BUSINESS ACTIVATION REQUEST
export const requestBusinessActivation = createAsyncThunk(
  "business/requestActivation",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/business/business-activation-request", {});
      return res.data; // { success, message, status: "Pending" }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Activation request failed");
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessStatus: (state, action) => {
      state.activationStatus = action.payload; // manually update if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestBusinessActivation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestBusinessActivation.fulfilled, (state, action) => {
        state.loading = false;
        state.activationStatus = action.payload.status; // "Pending"
      })
      .addCase(requestBusinessActivation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBusinessStatus } = businessSlice.actions;
export default businessSlice.reducer;
