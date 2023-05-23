import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isAuthenticated from "../../Utils/isAuth";
import { AppContext } from "../../App";
import { useCookies } from "react-cookie";
import { Checkbox } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import { set } from "date-fns";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

export const Navbars = (props) => {
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const navigate = useNavigate();
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
        `http://localhost:8000/products/search?text=${productName}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      props.search(data.products);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:8000/user/logout", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    // Cookies.remove("userId");
    // Cookies.remove("token");
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="navbrand">
            <Link to="/" className="logo">
              <img id="logo" src={require("./../Navbar/logo1.png")} alt="" />
              <span id="T">T</span>ech<span id="K">K</span>art
            </Link>
            {isLoggedIn || cookies.userId ? (
              <div className="logout" onClick={logoutHandler}>
                Logout
              </div>
            ) : (
              ""
            )}
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
                    <i className="fa-solid fa-magnifying-glass"></i>
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
                    <Chip
                      sx={{ cursor: "pointer" }}
                      icon={<FaceIcon />}
                      label="Account"
                    />
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
                      style={{ width: "28px", height: "28px" }}
                    />
                    {/* Wishlist */}
                  </a>
                  <Link to="/user/cart" className="cart">
                    <img
                      id="cart"
                      src={require("./../Navbar/cart.png")}
                      alt=""
                    />
                    {/* <span className="cart-number">{cartNumber}</span> */}
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
