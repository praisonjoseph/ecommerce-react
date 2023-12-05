export const ACTIONS = {
    FILTER_BY_CATEGORY: 'FILTER_BY_CATEGORY',
    FILTER_BY_COMPANY: 'FILTER_BY_COMPANY',
    FILTER_BY_COLOR: 'FILTER_BY_COLOR',
    FILTER_BY_PRICE: 'FILTER_BY_PRICE',
    FILTER_BY_SEARCH: 'FILTER_BY_SEARCH',
    FILTER_SEARCHTERM: 'FILTER_SEARCHTERM',
    CLEAR_FILTER: 'CLEAR_FILTER'
}

export const intitialState = {
    filteredProducts: [],
    searchTerm: ""
}

export function FilterReducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.FILTER_BY_CATEGORY:
            return {
                ...state,
                filteredProducts: payload.products.filter((product) =>
                    product.category === payload.category
                )
            };
        case ACTIONS.FILTER_BY_COMPANY:
            return {
                ...state,
                filteredProducts: payload.products.filter((product) =>
                    product.company === payload.company
                )
            };
        case ACTIONS.FILTER_BY_COLOR:
            return {
                ...state,
                filteredProducts: payload.products.filter((product) =>
                    product.color === payload.color
                )
            };

        case ACTIONS.FILTER_BY_PRICE:
            return {
                ...state,
                filteredProducts: payload.products.filter((product) =>
                    parseInt(product.newPrice) <= payload.price
                )
            };
        case ACTIONS.FILTER_BY_SEARCH:
            return {
                ...state,
                filteredProducts: payload.products.filter((product) =>
                    product.title.toLowerCase().includes(payload.searchTerm.toLowerCase())
                )
            };
        case ACTIONS.FILTER_SEARCHTERM:
                return {
                    ...state,
                    searchTerm: payload.event.target.value
                };
        case ACTIONS.CLEAR_FILTER:
            return {
                ...state,
                filteredProducts: []
            };

        default:
            return state
    }
}