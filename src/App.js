import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import FilterProvider from "./contexts/filterContext";
import CartProvider from './contexts/CartContext';


function App() {

  return (
    <div>
      <BrowserRouter>
        <FilterProvider>
          <CartProvider>
            <Header />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </CartProvider>
        </FilterProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
