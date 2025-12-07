import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

declare global {
  var authToken: string | null;
}

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
  isActivatedBusinessAccount: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  otpSent: false,
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      console.log("Register Response:", res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Register Failed");
    }
  }
);

// LOGIN → sends OTP
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("data from thunk",data)
      const res = await api.post("/auth/login", data);
      console.log("Login Response:", res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Login Failed");
    }
  }
);

// VERIFY OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-login-otp", data);
      global.authToken = res.data.token; // store token globally
      await AsyncStorage.setItem("authToken", res.data.token); // store token in AsyncStorage
      // console.log("OTP Verify Response:", res.data.token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "OTP Verify Failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/profile");

      // Save new token if backend returns it
      if (res.data.token) {
        global.authToken = res.data.token;
        await AsyncStorage.setItem("authToken", res.data.token);
      }

      // Save accountType
      await AsyncStorage.setItem("accountType", res.data.user.accountType);

      return res.data.user;
    } catch (err: any) {
      return rejectWithValue("Failed to load profile");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      global.authToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGIN (OTP SENT)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        // state.user = action.payload.user; // FIX HERE
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.otpSent = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
