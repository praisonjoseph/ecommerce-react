import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
      <h1>Hello World</h1>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
