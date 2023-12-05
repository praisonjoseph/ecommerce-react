import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, CartReducer, intitialState } from '../reducers/cartReducer';


const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(CartReducer, intitialState)

    const AddToCart = (newItem) => {
        dispatch({
          type: ACTIONS.ADD_TO_CART,
          payload: newItem,
        });
      };

      const DeleteFromCart = (id) => {
        dispatch({
          type: ACTIONS.DELETE_FROM_CART,
          payload: {
            id
        }
        });
      };

      const IncreaseQty = (id, qty=1) => {
        dispatch({
          type: ACTIONS.INCREASE_QTY,
          payload: {
            id,
            qty
        }
        });
      };

      const DecreaseQty = (id, qty=1) => {
        dispatch({
          type: ACTIONS.DECREASE_QTY,
          payload: {
            id,
            qty
        }
        });
      };
      const ClearCart = () => {
        dispatch({
          type: ACTIONS.CLEAR_CART,
        });
      };

    const value = {
        ...state,
        AddToCart,
        DeleteFromCart,
        IncreaseQty,
        DecreaseQty,
        ClearCart,
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider