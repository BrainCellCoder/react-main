import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import isAuthenticated from "../../Utils/isAuth";
import { AppContext } from "../../App";

export const Navbar = () => {
  const { cartNumber } = useContext(AppContext);
  const location = useLocation();
  const isAuth = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [location]);
  return (
    <>
      <div className="navbar fixed-top">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img id="logo" src={require("./../Navbar/logo1.png")} alt="" />
            <span id="T">T</span>ech<span id="K">K</span>art
          </Link>
          <div className="category">
            Categories <i className="fa-solid fa-caret-down"></i>
          </div>
          {/* <a href="deals">Deals</a> */}
          {/* <a href="whats-new">What's New</a> */}
          <a href="/user/wishlist">
            <img id="wishlist" src={require("./../Navbar/love.png")} alt="" />
            Wishlist
          </a>
        </div>
        <div className="nav-right">
          <div className="search-bar">
            <input type="text" placeholder="Search Product" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {isLoggedIn ? (
            <div className="account">
              <i className="fa-regular fa-user"></i>
              <span>Account</span>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {/* <Link to="/login">
              Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Link> */}
          {isLoggedIn && (
            <Link to="/user/cart" className="cart">
              <img id="cart" src={require("./../Navbar/cart.png")} alt="" />
              <span className="cart-number">{cartNumber}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
