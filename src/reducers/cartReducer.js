export const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_CART: 'UPDATE_CART',
    DELETE_FROM_CART: 'DELETE_FROM_CART'
}

export const intitialState = {
    cartProducts: [],
    totalQuantity: 0,
    totalPrice: 0,
}

export function CartReducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_TO_CART:
            const existingProductIndex = state.cartProducts.findIndex(
                (item) => item.id === payload.id
            )
            if (existingProductIndex >= 0) {
                // If the product is already in the cart, update the quantity or any other property
                return {
                    ...state,
                    cartProducts: state.cartProducts.map((item, index) =>
                        index === existingProductIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                // If the product is not in the cart, add it
                return {
                    ...state,
                    cartProducts: [...state.cartProducts, { ...payload, quantity: 1 }],
                };
            }

        case ACTIONS.UPDATE_CART:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.DELETE_FROM_CART:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state
    }
}