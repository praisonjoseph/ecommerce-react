import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, observeAuthState } from './redux/reducers/authReducer';
import { useEffect } from 'react';

function App() {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(observeAuthState());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/login" replace />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
