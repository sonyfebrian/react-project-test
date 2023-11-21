import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./slices/LoginSlice";
import { SignupSlice } from "./slices/RegisterSlice";
import BlogSlice from "./slices/BlogSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
    signup: SignupSlice.reducer,
    blog: BlogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
