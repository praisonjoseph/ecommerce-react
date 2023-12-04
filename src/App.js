import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Header from "./components/Header";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <BrowserRouter>
      <Header searchTerm={searchTerm} handleSearchInput={handleSearchInput}/>
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
