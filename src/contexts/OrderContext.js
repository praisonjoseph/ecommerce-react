import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { ACTIONS, OrderReducer, intitialState } from '../reducers/orderReducer';
import { db } from '../firebase'
import { collection, query, addDoc, getDocs, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function useOrders() {
    return useContext(OrderContext);
}

const OrderProvider = ({ children }) => {

    const [state, dispatch] = useReducer(OrderReducer, intitialState)
    const { user } = useAuth()
    console.log(user)
    console.log("OrderProvider component called")

    useEffect(() => {
        if (user) {
            const getCollection = async () => {
                setIsLoading(true);
                try {
                    const docRef = collection(db, "orders");
                    // const q = query(docRef, orderBy("createdAt", "desc"));
                    console.log("OrderProvider useEffect called", user.uid)
                    // const q = query(docRef)
                    const q = query(docRef, where("userID", "==", user.uid))
                    const querySnapshot = await getDocs(q);
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        data.push({ id: doc.id, ...doc.data() });
                    });
                    setOrders(data);
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    toast.error(error.message);
                }
            }
            getCollection()
        }
    }, [user])


    const addOrder = async (order) => {
        addDoc(collection(db, "orders"), order)
            .then((docRef) => {
                dispatch({
                    type: ACTIONS.ADD_ORDER,
                    payload: { id: docRef.id, ...order }
                });
                toast.success("Order Placed")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const setOrders = (orderdata) => {
        dispatch({
            type: ACTIONS.SET_ORDERS,
            payload: orderdata
        });
    }

    const setIsLoading = (isTrue) => {
        dispatch({
            type: ACTIONS.SET_ORDERS_LOADING,
            payload: isTrue
        });
    }
    const value = {
        ...state,
        addOrder,
        dispatch,
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider