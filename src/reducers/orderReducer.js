export const ACTIONS = {
    ADD_ORDER: 'ADD_ORDER',
    SET_ORDERS: 'SET_ORDERS',
    SET_ORDERS_LOADING: 'SET_ORDERS_LOADING'
}

export const intitialState = {
    orders: [],
    isLoading: false,
}

export function OrderReducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SET_ORDERS:
            return {
                ...state,
                orders: payload
            };
        case ACTIONS.ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, payload],
            };
        case ACTIONS.SET_ORDERS_LOADING:
            return {
                ...state,
                isLoading: payload
            };

        default:
            return state
    }
}