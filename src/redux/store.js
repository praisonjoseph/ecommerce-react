import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartReducer';
import { filterReducer } from './reducers/filterReducer';
import { orderReducer } from './reducers/orderReducer';
import { authReducer } from './reducers/authReducer';
import { productReducer } from './reducers/productReducer';
import { persistCartMiddleware, persistedCartState } from '../middleware/persistCart';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    order: orderReducer,
    auth: authReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoreActions: ['auth/observeAuthState/fulfilled'],
        // ignoredPaths: ['order.orders.*.createdAt']
      }
    }
  ).concat(persistCartMiddleware, logger),
  preloadedState: {
    cart: persistedCartState,
  }
})

