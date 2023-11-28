import React, { createContext, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export default CartProvider = ({ children }) => {
    
    
    const value = {
        cart,
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

