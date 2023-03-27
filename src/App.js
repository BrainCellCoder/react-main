import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Admin } from "./components/Admin Panel/Admin";
import { Headphones } from "./components/Home/Products/Headphones/Headphones";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Footer } from "./components/Footer/Footer";
import { Cart } from "./components/Cart/Cart";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { CheckOut } from "./components/CheckOut/CheckOut";
import { Accessories } from "./components/Home/Products/Accessories/Accessories";
// import { Protected } from "./Protected";

export const AppContext = createContext();

function App() {
  const [cartNumber, setCartNumber] = useState(0);
  return (
    <>
      <AppContext.Provider value={{ cartNumber, setCartNumber }}>
        <Router id="router">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/headphones" element={<Headphones />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            {/* <Route
            path="/products/:id"
            element={<Protected Component={ProductDetails} />}
          /> */}
            <Route
              path="/headphones/products/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/accessories/products/:id"
              element={<ProductDetails />}
            />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout/products/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
