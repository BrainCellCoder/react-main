import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { baseUrl } from "./../../../Utils/baseUrl";

export const Card = (props) => {
  const [message, setMessage] = useState("");

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
    });
    const data = await res.json();
    setMessage(data.message);
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
    setMessage(data.message);
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
          <p className="stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </p>
          <p className="number-of-reviews text-muted">(69)</p>
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
        <div
          className="wish"
          onClick={() => {
            addToWishList(props.data._id);
          }}
        >
          <i className="fa-regular fa-heart"></i>
        </div>
        {message && (
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
        )}
      </div>
    </div>
  );
};
