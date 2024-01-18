import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import { Provider } from "react-redux";
import { persistor, store } from './store.js'
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        </AuthProvider>
      </Provider>,
    
  </React.StrictMode>
);


