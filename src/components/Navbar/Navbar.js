import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import isAuthenticated from "../../Utils/isAuth";
import { AppContext } from "../../App";
import { useCookies } from "react-cookie";
import { Checkbox } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

export const Navbars = () => {
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const { cartNumber } = useContext(AppContext);
  const location = useLocation();
  const isAuth = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [location]);
  const [productName, setProductName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchProduct(productName);
  };

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };
  const searchProduct = async (productName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products?name=${productName}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log("Search results:", data);
      // Update the search results in the component state or perform any necessary actions
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <Link to="/" className="logo">
              <img id="logo" src={require("./../Navbar/logo1.png")} alt="" />
              <span id="T">T</span>ech<span id="K">K</span>art
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-right">
              <div className="product-search">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={productName}
                    onChange={handleInputChange}
                    placeholder="Search Product..."
                    style={{ color: "white" }}
                  />{" "}
                  <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
              {isLoggedIn || cookies.userId ? (
                <div>
                  <Link
                    to={`/dashboard/${
                      cookies.userId
                        ? cookies.userId
                        : localStorage.getItem("user_id")
                    }`}
                    className="account"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span>Account</span>
                  </Link>
                </div>
              ) : (
                <div className="login-btn">
                  <Link className="a" to="/login">
                    Login
                  </Link>
                </div>
              )}
              {isLoggedIn || cookies.userId ? (
                <div className="wish-cart">
                  <a href="/user/wishlist">
                    <img
                      id="wishlist"
                      src={require("./../Navbar/love.png")}
                      alt=""
                    />
                    Wishlist
                  </a>
                  <Link to="/user/cart" className="cart">
                    <img
                      id="cart"
                      src={require("./../Navbar/cart.png")}
                      alt=""
                    />
                    <span className="cart-number">{cartNumber}</span>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <div className="navbar fixed-top">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img id="logo" src={require("./../Navbar/logo1.png")} alt="" />
            <span id="T">T</span>ech<span id="K">K</span>art
          </Link>
          
        </div>
        <div className="nav-right">
          
          {isLoggedIn || cookies.userId ? (
            <div className="account">
              <i className="fa-regular fa-user"></i>
              <span>Account</span>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {isLoggedIn || cookies.userId ? (
            <div className="wish-cart">
              <a href="/user/wishlist">
                <img
                  id="wishlist"
                  src={require("./../Navbar/love.png")}
                  alt=""
                />
                Wishlist
              </a>
              <Link to="/user/cart" className="cart">
                <img id="cart" src={require("./../Navbar/cart.png")} alt="" />
                <span className="cart-number">{cartNumber}</span>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="burger">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </div> */}
    </>
  );
};
