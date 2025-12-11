// redux/slices/reelSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// --------------------------
// TYPES
// --------------------------
export interface Reel {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  reelProduct?: string;
  postedBy: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReelState {
  reels: Reel[];
  currentReel: Reel | null;
  loading: boolean;
  error: string | null;
}

// API RESPONSE TYPES
interface GetAllReelsResponse {
  page: number;
  limit: number;
  results: number;
  reels: Reel[];
}

interface DeleteReelResponse {
  message: string;
  reel: Reel; // backend returns full reel object
}

// --------------------------
// INITIAL STATE
// --------------------------
const initialState: ReelState = {
  reels: [],
  currentReel: null,
  loading: false,
  error: null,
};

// --------------------------
// THUNKS
// --------------------------

// CREATE Reel
export const createReel = createAsyncThunk(
  "reel/create",
  async (
    reelData: Omit<
      Reel,
      "_id" | "createdAt" | "updatedAt" | "likes" | "comments"
    >,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/reels/create-reel", reelData);
      return data as Reel;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create reel"
      );
    }
  }
);

// GET ALL Reels
export const getAllReels = createAsyncThunk(
  "reel/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reels");
      console.log(data)
      return data as GetAllReelsResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reels"
      );
    }
  }
);

// GET Reel BY ID
export const getReelById = createAsyncThunk(
  "reel/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/reels/${id}`);
      return data as Reel;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reel"
      );
    }
  }
);

// UPDATE Reel
export const updateReel = createAsyncThunk(
  "reel/update",
  async (
    { id, updates }: { id: string; updates: Partial<Reel> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`/reels/${id}`, updates);
      return data as Reel;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update reel"
      );
    }
  }
);

// DELETE Reel
export const deleteReel = createAsyncThunk(
  "reel/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/reels/${id}`);
      return data as DeleteReelResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete reel"
      );
    }
  }
);

// --------------------------
// SLICE
// --------------------------
const reelSlice = createSlice({
  name: "reel",
  initialState,
  reducers: {
    clearCurrentReel: (state) => {
      state.currentReel = null;
      state.error = null;
    },
    resetReels: (state) => {
      state.reels = [];
      state.currentReel = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder.addCase(createReel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createReel.fulfilled,
      (state, action: PayloadAction<Reel>) => {
        state.loading = false;
        state.reels.push(action.payload);
      }
    );
    builder.addCase(createReel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET ALL
    builder.addCase(getAllReels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllReels.fulfilled,
      (state, action: PayloadAction<GetAllReelsResponse>) => {
        state.loading = false;
        state.reels = action.payload.reels || [];
      }
    );
    builder.addCase(getAllReels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET BY ID
    builder.addCase(getReelById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getReelById.fulfilled,
      (state, action: PayloadAction<Reel>) => {
        state.loading = false;
        state.currentReel = action.payload;
      }
    );
    builder.addCase(getReelById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // UPDATE
    builder.addCase(updateReel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateReel.fulfilled,
      (state, action: PayloadAction<Reel>) => {
        state.loading = false;
        const index = state.reels.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) state.reels[index] = action.payload;

        if (state.currentReel?._id === action.payload._id)
          state.currentReel = action.payload;
      }
    );
    builder.addCase(updateReel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // DELETE
    builder.addCase(deleteReel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteReel.fulfilled,
      (state, action: PayloadAction<DeleteReelResponse>) => {
        state.loading = false;
        const deletedId = action.payload.reel._id;

        state.reels = state.reels.filter((r) => r._id !== deletedId);

        if (state.currentReel?._id === deletedId) state.currentReel = null;
      }
    );
    builder.addCase(deleteReel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentReel, resetReels } = reelSlice.actions;
export default reelSlice.reducer;
