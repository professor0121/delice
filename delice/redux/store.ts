import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import businessReducer from "./slice/business.slice"
import uploadReducer from "./slice/upload.slice"
import productReducer from "./slice/product.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business:businessReducer,
    upload:uploadReducer,
    product:productReducer
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
