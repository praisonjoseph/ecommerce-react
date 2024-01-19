// Save/update the cart state in localStorage on every cart action
export const persistCartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('cartItems', JSON.stringify(state.cart));
    return result;
  };

// Load the initial cart state from localStorage
export const persistedCartState = JSON.parse(localStorage.getItem('cartItems')) || {};
