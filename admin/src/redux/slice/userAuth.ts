import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// -------------------------
// TYPES
// -------------------------
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  userName: string;
  followers: string[];
  following: string[];
  accountType: string;
  isActivatedBusinessAccount: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  token: string | null;
  step:"login" | "otp";
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  token: localStorage.getItem("authToken") || null,
  step:"login"
};

// -------------------------
// LOGIN → SEND OTP
// -------------------------
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Login Failed");
    }
  }
);

// -------------------------
// VERIFY OTP → GET TOKEN + USER
// -------------------------
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    data: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/verify-login-otp", data);

      // STORE TOKEN IN LOCAL STORAGE (React Web)
      localStorage.setItem("authToken", res.data.token);

      // SET TOKEN IN AXIOS INSTANCE
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "OTP Verify Failed");
    }
  }
);

// -------------------------
// SLICE
// -------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpSent = false;
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN → OTP SENT
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.step = "otp";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // VERIFY OTP → SUCCESS
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpSent = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// -------------------------
export const { logout } = authSlice.actions;
export default authSlice.reducer;
