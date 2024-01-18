import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

// Async thunk to fetch products
export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (_, { dispatch }) => {
        try {
            const docRef = collection(db, 'products');
            const q = query(docRef);
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            dispatch(setProducts(data));
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw error;
        }
    }
);

const initialState = {
    products: [],
    isLoading: false,
    error: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log(action.payload)
            state.products = action.payload;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductsAsync.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProductsAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Error fetching orders"
            console.error("Error fetching orders:", action.payload)
        });
    },
});

export const { setProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
export const productSelector = (state) => state.product;
