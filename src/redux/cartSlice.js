import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addProductExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (addProductExists) {
        addProductExists.quantity += parseInt(action.payload.quantity);
      } else {
        state.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity),
        });
      }
      state.productNumber =
        state.productNumber + parseInt(action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      const productToRemove = state.products.find(
        (product) => product.id === action.payload
      );
      state.productNumber = state.productNumber - productToRemove.quantity;
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products.splice(index, 1);
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity = product.quantity + 1;
      }
      state.productNumber = product.quantity;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity = product.quantity - 1;
      }
      state.productNumber = product.quantity;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
