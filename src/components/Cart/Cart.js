import React, { useEffect, useState } from "react";
import "./Cart.css";
import { CartItems } from "./CartItems";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setCartItems(data.user.cart);
    };
    fetchCart();
  });

  return (
    <>
      <div className="container" id="cartItems">
        <div className="row">
          <div className="col-md-7">
            <div className="cart-items">
              {cartItems.map((item, key) => (
                <CartItems key={key} data={item} />
              ))}
            </div>
          </div>
          <div className="col-md-5">
            <div className="cart-items-checkout">Checkout</div>
          </div>
        </div>
      </div>
    </>
  );
};
