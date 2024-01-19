import { db } from '../../firebase'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, query, collection, where, addDoc, orderBy, serverTimestamp } from "firebase/firestore";

// Async thunk to fetch orders
export const fetchOrdersAsync = createAsyncThunk(
    "order/fetchOrders",
    async (_, ThunkApi) => {
        try {
            const { user } = ThunkApi.getState().auth; 
            const docRef = collection(db, "orders");
            // const q = query(docRef, where("userID", "==", user.uid));
            const q = query(docRef, where("userID", "==", user.uid), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return data;
        } catch (error) {
            return ThunkApi.rejectWithValue(error.message);
        }
    }
);

// Async thunk to add orders
export const addOrderAsync = createAsyncThunk(
    "order/addOrder",
    async (orderData, Thunkapi) => {
        try {
            const ordersCollection = collection(db, 'orders');
            const orderDocRef = await addDoc(ordersCollection, {
              ...orderData,
              createdAt: serverTimestamp(), 
            });
            return { id: orderDocRef.id, ...orderData };
        } catch (error) {
            return Thunkapi.rejectWithValue(`Failed to add order with ${error.message}`);
        }
    }
);

const initialState = {
    orders: [],
    isLoading: false,
    error: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Error fetching orders"
                console.error("Error fetching orders:", action.payload);
            })
            .addCase(addOrderAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // Check if the new order already exists in the orders array
                const isNewOrder = state.orders.every(
                    (order) => order.id !== action.payload.id
                );
                // This will make sure to add the new order only if it doesn't exist in the array. 
                // else it will create duplicate orders on addOrder action
                if (isNewOrder) {
                    state.orders.push(action.payload);
                }
            })
            .addCase(addOrderAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Error adding order"
                console.error("Error adding order:", action.payload);
            });
    },});

export const orderSelector = (state) => state.order;
export const orderReducer = orderSlice.reducer;
