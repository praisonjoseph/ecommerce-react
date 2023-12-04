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

    
    const value = {
        ...state,
        AddToCart,
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider