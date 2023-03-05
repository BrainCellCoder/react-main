import React from "react";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <>
      <div className="navbar container">
        <div className="nav-left">
          <div className="logo">LOGO</div>
          <div className="category">
            Categories <i className="fa-solid fa-caret-down"></i>
          </div>
          <a href="deals">Deals</a>
          <a href="whats-new">What's New</a>
          <a href="delivery">
            <i className="fa-regular fa-heart"></i> Wishlist
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
          <div className="cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
          </div>
        </div>
      </div>
    </>
  );
};
