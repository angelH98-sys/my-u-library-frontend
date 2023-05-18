import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/auth/auth.slice";
import { userSlice } from "../slice/user/user.slice";
import { authorSlice } from "../slice/author/author.slice";
import { genreSlice } from "../slice/genre/genre.slice";
import { bookSlice } from "../slice/book/book.slice";
import { checkoutSlice } from "../slice/checkout/checkout.slice";

export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    author: authorSlice.reducer,
    genre: genreSlice.reducer,
    book: bookSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});
