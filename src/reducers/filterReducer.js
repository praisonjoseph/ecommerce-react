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
    let tempProducts = [];
    switch (type) {
        case ACTIONS.FILTER_BY_CATEGORY:
            if (payload.category === "All") {
                tempProducts = payload.products;
            } else {
                tempProducts = payload.products.filter((product) =>
                    product.category === payload.category
                )
            }
            return {
                ...state,
                filteredProducts: tempProducts,

            };
        case ACTIONS.FILTER_BY_COMPANY:
            if (payload.company === "All") {
                tempProducts = payload.products;
            } else {
                tempProducts = payload.products.filter((product) =>
                    product.company === payload.company
                )
            }
            return {
                ...state,
                filteredProducts: tempProducts
            };
        case ACTIONS.FILTER_BY_COLOR:
            if (payload.color === "All") {
                tempProducts = payload.products;
            } else {
                tempProducts = payload.products.filter((product) =>
                    product.color === payload.color
                )
            }
            return {
                ...state,
                filteredProducts: tempProducts
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
                filteredProducts: payload.products
            };

        default:
            return state
    }
}