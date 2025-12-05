import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/userAuth";
import userReducer from "./slice/userSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users:userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
