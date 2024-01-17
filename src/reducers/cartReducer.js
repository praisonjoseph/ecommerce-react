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



// import {toast} from 'react-toastify'

// export const ACTIONS = {
//     ADD_TO_CART: 'ADD_TO_CART',
//     INCREASE_QTY: 'INCREASE_QTY',
//     DECREASE_QTY: 'DECREASE_QTY',
//     DELETE_FROM_CART: 'DELETE_FROM_CART',
//     SET_TOTAL: 'SET_TOTAL',
//     CLEAR_CART: 'CLEAR_CART'
// }

// export const intitialState = {
//     cartProducts: [],
//     totalPrice: 0,
// }

// export function CartReducer(state, { type, payload }) {
//     switch (type) {
//         case ACTIONS.ADD_TO_CART:
//             const existingProductIndex = state.cartProducts.findIndex(
//                 (item) => item.id === payload.id
//             )
//             if (existingProductIndex >= 0) {
//                 // If the product is already in the cart, update the quantity or any other property
//                 // toast.success("Updated quantity by 1")
//                 return {
//                     ...state,
//                     cartProducts: state.cartProducts.map((item, index) =>
//                         index === existingProductIndex
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     ),
//                 };
//             } else {
//                 // If the product is not in the cart, add it
//                 // console.log("inside add cart")
//                 // toast.success("Product added to Cart")
//                 return {
//                     ...state,
//                     cartProducts: [...state.cartProducts, { ...payload, quantity: 1 }],
//                 };
//             }
//         case ACTIONS.DELETE_FROM_CART:
//             return {
//                 ...state,
//                 cartProducts: state.cartProducts.filter((item) =>
//                     item.id !== payload.id
//                 ),
//             }
//         case ACTIONS.INCREASE_QTY:
//             let tempCart = []

//             return {
//                 ...state,
//                 cartProducts: state.cartProducts.map((item) =>
//                     item.id === payload.id
//                         ? { ...item, quantity: item.quantity + payload.qty }
//                         : item
//                 ),
//             };
//         case ACTIONS.DECREASE_QTY:
//             return {
//                 ...state,
//                 cartProducts: state.cartProducts.map((item) =>
//                     item.id === payload.id
//                         ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - payload.qty }
//                         : item
//                 ),
//             };
//         case ACTIONS.SET_TOTAL:
//             return {
//                 ...state,
//                 totalPrice: state.cartProducts.reduce((acc, curr) => acc + Number(curr.newPrice) * curr.quantity, 0)
//             };
//         case ACTIONS.CLEAR_CART:
//             return {
//                 ...state,
//                 cartProducts: []
//             };
//         default:
//             return state
//     }
// }