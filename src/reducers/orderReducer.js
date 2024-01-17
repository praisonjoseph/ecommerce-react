import { db } from '../firebase'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, query, collection, where, addDoc } from "firebase/firestore";
// import { useAuth } from '../contexts/AuthContext';

// Async thunk to fetch orders
export const fetchOrdersAsync = createAsyncThunk(
    "order/fetchOrders",
    async (_, ThunkApi) => {
        try {
            //   const { user } = ThunkApi.getState().auth; // Assuming you have an auth slice in your Redux store
            // const { user } = useAuth()
            console.log("fetchOrdersAsync is getting called")
            const docRef = collection(db, "orders");
            const q = query(docRef)
            //   const q = query(docRef, where("userID", "==", user.uid));
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

export const addOrderAsync = createAsyncThunk(
    "order/addOrder",
    async (orderData, Thunkapi) => {
        try {
            console.log("addOrderAsync is getting called")
            const docRef = await addDoc(collection(db, "orders"), orderData);
            return { id: docRef.id, ...orderData };
        } catch (error) {
            return Thunkapi.rejectWithValue(error.message);
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
        // addOrder: (state, action) => {
        //     state.orders.push(action.payload);
        // },
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
                // state.orders.push(action.payload);
                // Check if the new order already exists in the orders array
                const isNewOrder = state.orders.every(
                    (order) => order.id !== action.payload.id
                );

                // Add the new order only if it doesn't exist in the array
                if (isNewOrder) {
                    state.orders.push(action.payload);
                }
            })
            .addCase(addOrderAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Error adding order"
                console.error("Error adding order:", action.payload);
            });
    },
});

export const { addOrder } = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;

export const orderReducer = orderSlice.reducer;


// export const ACTIONS = {
//     ADD_ORDER: 'ADD_ORDER',
//     SET_ORDERS: 'SET_ORDERS',
//     SET_ORDERS_LOADING: 'SET_ORDERS_LOADING'
// }

// export const intitialState = {
//     orders: [],
//     isLoading: false,
// }

// export function OrderReducer(state, { type, payload }) {
//     switch (type) {
//         case ACTIONS.SET_ORDERS:
//             return {
//                 ...state,
//                 orders: payload
//             };
//         case ACTIONS.ADD_ORDER:
//             return {
//                 ...state,
//                 orders: [...state.orders, payload],
//             };
//         case ACTIONS.SET_ORDERS_LOADING:
//             return {
//                 ...state,
//                 isLoading: payload
//             };

//         default:
//             return state
//     }
// }