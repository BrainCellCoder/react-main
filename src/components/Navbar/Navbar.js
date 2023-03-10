import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
          <a href="deals">Deals</a>
          <a href="whats-new">What's New</a>
          <a href="/wishlist">
            <img id="wishlist" src={require("./../Navbar/love.png")} alt="" />
            Wishlist
          </a>
        </div>
        <div className="nav-right">
          <div className="search-bar">
            <input type="text" placeholder="Search Product" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="account">
            <i className="fa-regular fa-user"></i>
            <span>Account</span>
          </div>
          {/* <Link to="/login">
              Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Link> */}
          <div className="cart">
            <img id="cart" src={require("./../Navbar/cart.png")} alt="" />
            <span className="cart-number">0</span>
          </div>
        </div>
      </div>
    </>
  );
};
