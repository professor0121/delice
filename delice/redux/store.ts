import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import businessReducer from "./slice/business.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business:businessReducer
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
