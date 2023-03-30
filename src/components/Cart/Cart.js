import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartItems } from "./CartItems";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartNumber, setCartNumber } = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  const [cartItemstotalPrice, setcartItemsTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCartItems(data.user.cart);
    };
    fetchCart();

    const totalPrice = cartItems.reduce((acc, obj) => acc + obj.price, 0);
    const formatedTotalPrice = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(totalPrice);
    setcartItemsTotalPrice(formatedTotalPrice);
    setCartNumber(cartItems.length);
  });

  return (
    <>
      <div id="cartItems">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="heading-my-cart">
                <h3>My Cart ({cartItems.length})</h3>
                <span>Total Amount: ₹ {cartItemstotalPrice}</span>
              </div>
              <div className="cart-items">
                {cartItems.map((item, key) => (
                  <CartItems
                    key={key}
                    data={item}
                    cartLength={cartItems.length}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-5">
              {cartItems.length >= 1 ? (
                <div className="cart-items-checkout">
                  <p className="delivery-date">Delivery date: April 24, 2023</p>
                  <div className="promocode">
                    <p>Apply Promocode and get 20% off</p>
                    <div className="promocode-input">
                      <input type="text" placeholder="Promocode" />
                      <button> Apply </button>
                    </div>
                  </div>
                  <div className="subtotal">
                    <p>Subtotal</p>
                    <div className="discount">
                      <p>Discount</p>
                      <p>₹ 3497 - (20%)</p>
                    </div>
                    <div className="delivery">
                      <p>Delivery</p>
                      <p>₹ 99</p>
                    </div>
                    <div className="tax">
                      <p>Tax</p>
                      <p>₹ 150</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>₹ 2345</p>
                  </div>

                  <div className="checkout-shopping">
                    <Link to="/checkout" className="checkout">
                      Proceed to Checkout
                    </Link>
                    <div className="shopping">Continue Shopping</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
