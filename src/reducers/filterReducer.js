import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  filteredProducts: [],
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      const { category, products } = action.payload;
      state.filteredProducts =
        category === "All"
          ? products
          : products.filter((product) => product.category === category);
    },
    filterByCompany: (state, action) => {
      const { company, products } = action.payload;
      state.filteredProducts =
        company === "All"
          ? products
          : products.filter((product) => product.company === company);
    },
    filterByColor: (state, action) => {
      const { color, products } = action.payload;
      state.filteredProducts =
        color === "All"
          ? products
          : products.filter((product) => product.color === color);
    },
    filterByPrice: (state, action) => {
      const { price, products } = action.payload;
      state.filteredProducts = products.filter(
        (product) => parseInt(product.newPrice) <= price
      );
    },
    filterBySearch: (state, action) => {
      const { searchTerm, products } = action.payload;
      state.filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    filterSearchTerm: (state, action) => {
      state.searchTerm = action.payload.target.value;
    },
    clearFilter: (state, action) => {
      state.filteredProducts = action.payload.products;
    },
  },
});

export const {
  filterByCategory,
  filterByCompany,
  filterByColor,
  filterByPrice,
  filterBySearch,
  filterSearchTerm,
  clearFilter,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
export const filterSelector = (state) => state.filter;
