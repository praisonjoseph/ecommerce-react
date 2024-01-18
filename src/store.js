import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartReducer';
import { filterReducer } from './reducers/filterReducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
// import storage from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage/session"
import logger from 'redux-logger'
import { orderReducer } from './reducers/orderReducer';
import { authReducer, setUser } from './reducers/authReducer';

const persistConfig = {
    key: "cartItems", // key for the localStorage key
    storage, // use localStorage as the storage engine
    whitelist: ['cart'], // specify which reducers to persist
  };

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        cart: persistedReducer,
        filter: filterReducer,
        order: orderReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, setUser],
          },
      }).concat(logger)
})

export const persistor = persistStore(store);
