import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/auth/auth.slice";
import { userSlice } from "../slice/user/user.slice";

export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});
