import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { Navbars } from "./components/Navbar/Navbar";
import { Admin } from "./components/Admin Panel/Admin";
import { Headphones } from "./components/Home/Products/Headphones/Headphones";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Footer } from "./components/Footer/Footer";
import { Cart } from "./components/Cart/Cart";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { CheckOut } from "./components/CheckOut/CheckOut";
import { Accessories } from "./components/Home/Products/Accessories/Accessories";
import { PaymentSuccess } from "./components/PaymentSuccess";
import { Protected } from "./Protected";
import { UserDashboard } from "./components/UserDashboard/UserDashboard";
import { LoginAdmin } from "./components/Admin Panel/Login";
import { Tv } from "./components/Home/Products/TV/Tv";
import { Camera } from "./components/Home/Products/Camera/Camera";
import { Gaming } from "./components/Home/Products/Gaming/Gaming";
import { Landline } from "./components/Home/Products/Landline/Landline";
import { Radio } from "./components/Home/Products/Radio/Radio";
import { Speaker } from "./components/Home/Products/Speaker/Speaker";
// import { Protected } from "./Protected";

export const AppContext = createContext();

function App() {
  const [cartNumber, setCartNumber] = useState(0);
  const [searchProducts, setSearchProducts] = useState([]);
  return (
    <>
      <AppContext.Provider value={{ cartNumber, setCartNumber }}>
        <Router id="router">
          <Navbars search={setSearchProducts} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home searchProducts={searchProducts} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin" element={<Protected Component={Admin} />} />

            {/* <Route path="/dashboard/:id" element={<UserDashboard />} /> */}
            <Route
              path="/dashboard/:id"
              element={<Protected Component={UserDashboard} />}
            />

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
            <Route path="/tv/products/:id" element={<ProductDetails />} />
            <Route path="/camera/products/:id" element={<ProductDetails />} />
            <Route path="/gaming/products/:id" element={<ProductDetails />} />
            <Route path="/landline/products/:id" element={<ProductDetails />} />
            <Route path="/radio/products/:id" element={<ProductDetails />} />
            <Route path="/speaker/products/:id" element={<ProductDetails />} />
            <Route
              path="/accessories/products/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/tv"
              element={<Tv searchProducts={searchProducts} />}
            />
            <Route path="/camera" element={<Camera />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/landline" element={<Landline />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/speaker" element={<Speaker />} />

            {/* <Route path="/user/cart" element={<Cart />} /> */}
            <Route path="/user/cart" element={<Protected Component={Cart} />} />

            {/* <Route path="/user/wishlist" element={<Wishlist />} /> */}
            <Route
              path="/user/wishlist"
              element={<Protected Component={Wishlist} />}
            />

            {/* <Route path="/checkout" element={<CheckOut />} /> */}
            <Route
              path="/checkout"
              element={<Protected Component={CheckOut} />}
            />

            <Route path="/checkout/products/:id" element={<ProductDetails />} />
            <Route
              path="user/wishlist/products/:id"
              element={<ProductDetails />}
            />

            {/* <Route path="/paymentsuccess" element={<PaymentSuccess />} /> */}
            <Route
              path="/paymentsuccess"
              element={<Protected Component={PaymentSuccess} />}
            />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
