export const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    INCREASE_QTY: 'INCREASE_QTY',
    DECREASE_QTY: 'DECREASE_QTY',
    DELETE_FROM_CART: 'DELETE_FROM_CART',
    SET_TOTAL: 'SET_TOTAL',
    CLEAR_CART: 'CLEAR_CART'
}

export const intitialState = {
    cartProducts: [],
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
        case ACTIONS.DELETE_FROM_CART:
            return {
                ...state,
                cartProducts: state.cartProducts.filter((item) =>
                    item.id !== payload.id
                ),
            }
        case ACTIONS.INCREASE_QTY:
            let tempCart = []

            return {
                ...state,
                cartProducts: state.cartProducts.map((item) =>
                    item.id === payload.id
                        ? { ...item, quantity: item.quantity + payload.qty }
                        : item
                ),
            };
        case ACTIONS.DECREASE_QTY:
            return {
                ...state,
                cartProducts: state.cartProducts.map((item) =>
                    item.id === payload.id
                        ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - payload.qty }
                        : item
                ),
            };
        case ACTIONS.SET_TOTAL:
            return {
                ...state,
                totalPrice: state.cartProducts.reduce((acc, curr) => acc + Number(curr.newPrice) * curr.quantity, 0)
            };
        case ACTIONS.CLEAR_CART:
            return {
                ...state,
                cartProducts: []
            };
        default:
            return state
    }
}