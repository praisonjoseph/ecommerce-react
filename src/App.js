import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from "./components/Signup";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
