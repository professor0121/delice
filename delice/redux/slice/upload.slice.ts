// redux/slices/uploadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

export interface UploadState {
  reelVideo: string;
  image: string; // single image
  images: string[]; // gallery images
  loading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  reelVideo: "",
  image: "",
  images: [],
  loading: false,
  error: null,
};

// -------------------------------------------------
//  THUNK: Upload Single Image
// -------------------------------------------------
export const uploadImage = createAsyncThunk(
  "upload/image",
  async (file: File, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("file", file);

      const { data } = await api.post("/cloudinary/upload/single", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data.url; // API returns single image URL
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Single image upload failed"
      );
    }
  }
);

// -------------------------------------------------
//  THUNK: Upload Multiple Images (Gallery)
// -------------------------------------------------
export const uploadImages = createAsyncThunk(
  "upload/images",
  async (files: File[], { rejectWithValue }) => {
    try {
      const form = new FormData();
      files.forEach((file) => form.append("files", file));

      const { data } = await api.post("/cloudinary/upload/gallery", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data.urls; // array of uploaded URLs
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gallery upload failed"
      );
    }
  }
);

// -------------------------------------------------
//  THUNK: Upload Reel Video (Single Video)
// -------------------------------------------------
export const uploadReelVideo = createAsyncThunk(
  "upload/reelVideo",
  async (file: { uri: string; name: string; type: string }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
console.log(form)
      const { data } = await api.post("/cloudinary/upload/single", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data)
      return data.url; // Single video URL returned
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Video upload failed"
      );
    }
  }
);

// -------------------------------------------------
//  SLICE
// -------------------------------------------------
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploads: (state) => {
      state.image = "";
      state.images = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // -------------------------------------------------
    // single image
    // -------------------------------------------------
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload; // single image URL
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // -------------------------------------------------
    // multiple images (gallery)
    // -------------------------------------------------
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload; // multiple URLs
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // -------------------------------------------------
    // Single video upload reducer
    // -------------------------------------------------
    builder
      .addCase(uploadReelVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadReelVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.reelVideo = action.payload; // set uploaded video URL
      })
      .addCase(uploadReelVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploads } = uploadSlice.actions;
export default uploadSlice.reducer;
