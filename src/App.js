import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Admin } from "./components/Admin Panel/Admin";
import { Headphones } from "./components/Home/Products/Headphones/Headphones";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/headphones" element={<Headphones />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/headphones/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
