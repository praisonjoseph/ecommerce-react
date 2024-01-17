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
            // console.log(user)
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

export const addCommentAsync = createAsyncThunk("comments/addcomment",
    async (payload) => {
        console.log(payload)
        await addDoc(collection(db, "orders"), payload)
            .then((docRef) => {
                dispatch({
                    type: ACTIONS.ADD_ORDER,
                    payload: { id: docRef.id, ...order }
                });
            })
        const response = await fetch(
            "https://jsonplaceholde.typicode.com/comments", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                payload
            })
        }
        );
        return response.json();
    }
)

const initialState = {
    orders: [],
    isLoading: false,
    error: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
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