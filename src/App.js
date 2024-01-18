import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth()
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer />
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
