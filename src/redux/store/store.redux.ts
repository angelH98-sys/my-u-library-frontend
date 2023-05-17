import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/auth/auth.slice";

export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
