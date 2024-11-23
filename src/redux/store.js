import { configureStore, createReducer, createStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});

