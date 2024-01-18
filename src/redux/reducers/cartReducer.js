import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartProducts.find((p) => p.id === product.id);

      if (existingProduct) {
        // If product is already in the cart, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If product is not in the cart, add it
        state.cartProducts.push({ ...product, quantity: 1 });
      }
      // Update total price
      state.totalPrice += Number(product.newPrice);
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      const productToRemove = state.cartProducts.find((p) => p.id === productId);

      if (productToRemove) {
        // Subtract the price of the removed product from the total
        state.totalPrice -= Number(productToRemove.newPrice) * productToRemove.quantity;
        // Remove the product from the cart
        state.cartProducts = state.cartProducts.filter((p) => p.id !== productId);
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const productToIncrease = state.cartProducts.find((p) => p.id === productId);

      if (productToIncrease) {
        // Increase the quantity of the selected product
        productToIncrease.quantity += 1;
        // Update the total price
        state.totalPrice += Number(productToIncrease.newPrice);
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const productToDecrease = state.cartProducts.find((p) => p.id === productId);

      if (productToDecrease && productToDecrease.quantity > 1) {
        // Decrease the quantity of the selected product (minimum 1)
        productToDecrease.quantity -= 1;
        // Update the total price
        state.totalPrice -= Number(productToDecrease.newPrice);
      }
    },
    clearCart: (state) => {
        // Clear the entire cart
        state.cartProducts = [];
        // Reset the total price to zero
        state.totalPrice = 0;
      },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cart;
