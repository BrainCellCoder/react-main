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
