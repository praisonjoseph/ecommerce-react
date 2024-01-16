// import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
// import { ACTIONS, CartReducer, intitialState } from '../reducers/cartReducer';

// const CART_STORAGE_KEY = 'cart';
// const CartContext = createContext();

// export function useCart() {
//     return useContext(CartContext);
// }

// const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(CartReducer, intitialState)

//     useEffect(() => {
//       // Load cart state from localStorage on component mount
//       const storedCart = localStorage.getItem(CART_STORAGE_KEY);
//       const parsedCart = JSON.parse(storedCart)
//       if (parsedCart) {
//         parsedCart.forEach((cartItem) => {
//           dispatch({
//             type: ACTIONS.ADD_TO_CART,
//             payload: cartItem
//           });
//         })

//       }
//     }, []);
  
//     useEffect(() => {
//       // Save cart state to localStorage whenever it changes
//       localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartProducts));
//     }, [state.cartProducts]);

//     const AddToCart = (newItem) => {
//         dispatch({
//           type: ACTIONS.ADD_TO_CART,
//           payload: newItem,
//         });
//       }

//       const DeleteFromCart = (id) => {
//         dispatch({
//           type: ACTIONS.DELETE_FROM_CART,
//           payload: {
//             id
//         }
//         });
//       }

//       const IncreaseQty = (id, qty=1) => {
//         dispatch({
//           type: ACTIONS.INCREASE_QTY,
//           payload: {
//             id,
//             qty
//         }
//         });
//       }

//       const DecreaseQty = (id, qty=1) => {
//         dispatch({
//           type: ACTIONS.DECREASE_QTY,
//           payload: {
//             id,
//             qty
//         }
//         });
//       }

//       const SetTotal = useCallback(() => {
//         dispatch({
//           type: ACTIONS.SET_TOTAL,
//         });
//       }, [dispatch])

//       const ClearCart = () => {
//         dispatch({
//           type: ACTIONS.CLEAR_CART,
//         });
//       }

//     const value = {
//         ...state,
//         AddToCart,
//         DeleteFromCart,
//         IncreaseQty,
//         DecreaseQty,
//         SetTotal,
//         ClearCart,
//     }
//     // const value = useMemo(() => ({
//     //   ...state,
//     //   AddToCart,
//     //   DeleteFromCart,
//     //   IncreaseQty,
//     //   DecreaseQty,
//     //   SetTotal,
//     //   ClearCart,
//     // }), [state, AddToCart, DeleteFromCart, IncreaseQty, DecreaseQty, SetTotal, ClearCart]);
  
//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export default CartProvider