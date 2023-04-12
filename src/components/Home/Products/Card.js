import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../ProductDetails/StarRating";
// import { baseUrl } from "./../../../Utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Card = (props) => {
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState(false);

  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const navigate = useNavigate();

  const addToCart = async (id) => {
    const res = await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: 1,
      }),
    });
    const data = await res.json();
    setMessage(data.message);
    toast.success(data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCart(!cart);
    if (!data.success) {
      navigate("/login");
    }
  };

  const addToWishList = async (id) => {
    const res = await fetch(`http://localhost:8000/user/wishlist/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    toast.success(data.message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (!data.success) {
      navigate("/login");
    }
  };

  return (
    <div className="col-lg-3 col-md-6">
      <div className="product">
        <div
          className="image"
          style={{ backgroundImage: `url(${imgURL})` }}
        ></div>
        <div className="title">
          <h6 className="name">{props.data.name}</h6>
          <h6 className="price">₹{price}</h6>
        </div>
        <div className="ratings">
          {/* <p className="stars"> */}
          <StarRating rating={props.data.rating} />
          {/* </p> */}
          <p className="number-of-reviews text-muted">
            ({props.data.numOfReviews} reviews)
          </p>
        </div>
        <div className="add-view">
          <div
            className="add-to-cart"
            onClick={() => {
              addToCart(props.data._id);
            }}
          >
            Add to cart
          </div>
          <Link
            className="view"
            to={`products/${props.data._id}`}
            state={{ product: props.data }}
          >
            View
          </Link>
        </div>
        {/* const isProductPresent = products.some(product => product.id === productIdToFind); */}
        <div
          className="wish"
          onClick={() => {
            addToWishList(props.data._id);
          }}
        >
          <i className="fa-regular fa-heart"></i>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          // closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* {message && (
          <Alert
            style={{
              padding: "5px",
              margin: "5px 0 0 0",
              display: "flex",
              justifyContent: "space-between",
            }}
            variant="success"
            onClose={() => setMessage("")}
          >
            <p style={{ margin: "0" }}>{message}</p>
            <p
              id="message-close-btn"
              style={{ margin: "0", marginRight: "5px", cursor: "pointer" }}
              onClick={() => setMessage("")}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </p>
          </Alert>
        )} */}
      </div>
    </div>
  );
};
