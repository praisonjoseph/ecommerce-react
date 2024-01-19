import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import { Provider } from "react-redux";
import { store } from './redux/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </Provider>,

  </React.StrictMode>
);


