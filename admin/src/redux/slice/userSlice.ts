import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// -------------------------
// TYPES
// -------------------------

export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  profileImage?: string;
  userName: string;
  followers: string[];
  following: string[];
  bio?: string;
  accountType: "Personal" | "Business" | "Admin";
  isActivatedBusinessAccount: "Activated" | "Requested" | "NotActivated";
  mobileNumber?: string;
}

export interface FetchUsersParams {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

interface UserState {
  list: User[];
  loading: boolean;
  error: string | null;
}

// -------------------------
// INITIAL STATE
// -------------------------

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

// -------------------------
// THUNKS
// -------------------------

// Fetch All Users
export const fetchAllUsers = createAsyncThunk<
  User[], // return type
  FetchUsersParams, // params type
  { rejectValue: string } // error type
>("users/fetchAll", async ({ search, type }, thunkAPI) => {
  try {
    const res = await api.get("/users/get-all-user", {
      params: { search, type },
    });

    return res.data.users as User[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to load users"
    );
  }
});

// Delete User
export const deleteUser = createAsyncThunk<
  string, // return user id
  string, // argument id
  { rejectValue: string }
>("users/delete", async (email, thunkAPI) => {
  try {
    await api.post(`/users/soft-delete-user/`, { email });
    return email;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to delete user"
    );
  }
});

// Async thunk to fetch users with business requested
export const getBusinessRequestedUser = createAsyncThunk<
  User[],       // returned type
  void,         // parameter type
  { rejectValue: string }
>(
  "users/businessRequested",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/get-business-requested-user");
      // assuming backend returns { success: true, users: [...] }
      return res.data.users;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// redux/slice/userSlice.ts
export const activateBusinessAccount = createAsyncThunk<
  User,            // return updated user
  string,          // user ID
  { rejectValue: string }
>("users/activateBusiness", async (email, thunkAPI) => {
  try {
    const res = await api.post(`/admin/activate-business/${email}`);
    return res.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to activate business account"
    );
  }
});


// -------------------------
// SLICE
// -------------------------

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading users";
      });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((u) => u._id !== action.payload);
    })

    // Fetch business-requested users
    builder
      .addCase(getBusinessRequestedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusinessRequestedUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getBusinessRequestedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading business-requested users";
      });
  },
});

// -------------------------

export default userSlice.reducer;
