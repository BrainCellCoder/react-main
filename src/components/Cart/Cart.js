import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartItems } from "./CartItems";
import { AppContext } from "../../App";
import { useCookies } from "react-cookie";
import { FloatingLabel, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Link } from "react-router-dom";

export const Cart = () => {
  const { cartNumber, setCartNumber } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(address, phone);
  //   handleCloseModal();
  // };

  const [cartItems, setCartItems] = useState([]);
  const [cartItemstotalPrice, setcartItemsTotalPrice] = useState(0);
  let totalPrice;

  let currentDate = new Date();
  let futureDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format the future date to display as Month DD, YYYY
  let formattedDate =
    monthNames[futureDate.getMonth()] +
    " " +
    futureDate.getDate() +
    ", " +
    futureDate.getFullYear();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();
      // console.log(data);
      setCartItems(data.user.cart);
    };
    fetchCart();
    totalPrice = cartItems.reduce(
      (acc, obj) => acc + obj.productId.price * obj.quantity,
      0
    );
    const formatedTotalPrice = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(totalPrice);
    setcartItemsTotalPrice(formatedTotalPrice);
    setCartNumber(cartItems.length);
  }, [cartItems]);

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const price = totalPrice;
    // const productId = props.data._id;
    const keyRes = await fetch("http://localhost:8000/getkey");
    const keyResp = await keyRes.json();
    const user = await fetch("http://localhost:8000/user/me", {
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = await user.json();

    const res = await fetch("http://localhost:8000/payment/checkout", {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
        cart: cartItems,
        buyer: localStorage.getItem("user_id") || cookies.userId,
        address,
        phone,
        email: userData.user.email,
      }),
    });
    const resp = await res.json();
    console.log(resp);
    handleCloseModal();

    const options = {
      key: keyResp.key, // Enter the Key ID generated from the Dashboard
      amount: resp.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "TechKart",
      description: "RazorPay Transaction",
      image:
        "https://res.cloudinary.com/dywjchq8q/image/upload/v1681550262/logo1_hrtppt.png",
      order_id: resp.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8000/payment/paymentverification",
      prefill: {
        //logged in user details
        name: userData.user.name,
        email: userData.user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#7b2cbf",
      },
    };
    const razor = new window.Razorpay(options);
    console.log(razor);
    razor.open();
  };

  return (
    <>
      <div id="cartItems">
        <div>
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
                  <p className="delivery-date">
                    Delivery date: {formattedDate}
                  </p>
                  {/* <div className="promocode">
                    <p>Apply Promocode and get 20% off</p>
                    <div className="promocode-input">
                      <input type="text" placeholder="Promocode" />
                      <button> Apply </button>
                    </div>
                  </div> */}
                  <div className="subtotal">
                    <div className="discount">
                      <p>Price ({cartItems.length} items)</p>
                      <p>₹ {cartItemstotalPrice}</p>
                    </div>
                    <div className="delivery">
                      <p>Delivery Charge</p>
                      <p style={{ color: "green" }}>free</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>₹ {cartItemstotalPrice}</p>
                  </div>

                  <div className="checkout-shopping">
                    <Link
                      to="/checkout"
                      state={{
                        cartLength: cartItems.length,
                        cartItemstotalPrice,
                        formattedDate,
                      }}
                      className="checkout"
                    >
                      Proceed to Checkout
                    </Link>
                    {/* <div
                      className="checkout"
                      onClick={handleOpenModal}
                      // onClick={checkoutHandler}
                    >
                      Proceed to CheckOut
                    </div> */}
                    <div className="shopping">Continue Shopping</div>
                  </div>
                  {/* <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Fill out this form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="address-form" onSubmit={checkoutHandler}>
                        <textarea
                          type="text"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter Full Address"
                          required={true}
                        />
                        <input
                          type="number"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter Phone Number"
                          required={true}
                        />
                        <button type="submit">Proceed</button>
                      </form>
                    </Modal.Body>
                  </Modal> */}
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
