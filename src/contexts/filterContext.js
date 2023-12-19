import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { ACTIONS, FilterReducer, intitialState } from '../reducers/filterReducer';


const FilterContext = createContext();

export function useFilter() {
    return useContext(FilterContext);
}

const FilterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(FilterReducer, intitialState)

    const FilterByCompany = (products, company) => {
        dispatch({
          type: ACTIONS.FILTER_BY_COMPANY,
          payload: {
            products,
            company
        },
        });
      };

      const FilterByColor = (products, color) => {
        dispatch({
          type: ACTIONS.FILTER_BY_COLOR,
          payload: {
            products,
            color
        }
        });
      };

      const FilterByCategory = (products, category) => {
        dispatch({
          type: ACTIONS.FILTER_BY_CATEGORY,
          payload: {
            products,
            category,
        }
        });
      };

      const FilterByPrice = (products, price) => {
        dispatch({
          type: ACTIONS.FILTER_BY_PRICE,
          payload: {
            products,
            price,
        }
        });
      };

      const FilterBySearch = useCallback((products, searchTerm) => {
        dispatch({
          type: ACTIONS.FILTER_BY_SEARCH,
          payload: {
            products, 
            searchTerm,
        }
        });
      },[dispatch])

      const FilterSearchTerm = (event) => {
        dispatch({
          type: ACTIONS.FILTER_SEARCHTERM,
          payload: {
            event
        }
        });
      }

      const ClearFilter = (products) => {
        dispatch({
          type: ACTIONS.CLEAR_FILTER,
          payload: {
            products
        }
        });
      };

    const value = {
        ...state,
        FilterByCompany,
        FilterByColor,
        FilterByCategory,
        FilterByPrice,
        FilterBySearch,
        FilterSearchTerm,
        ClearFilter,
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider