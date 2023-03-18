import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./CardDetails.css";
import { Alert } from "react-bootstrap";

export const CardDetails = (props) => {
  const [message, setMessage] = useState("");

  const imageUrl = props.data.image ? props.data.image[0].url : null;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const addToCart = async (id) => {
    const res = await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    setMessage(data.message);

    if (!data.success) {
      Navigate("/login");
    }
  };

  return (
    <>
      <div id="product-details">
        <div id="gutter" className="row">
          <div
            className="col-md-6 product-img"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          <div className="col-md-6 product-info">
            <div className="product-details">
              <h3>{props.data.name}</h3>
              <p className="text-muted">{props.data.description}</p>
              <div className="ratings">
                <p className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </p>
                <p className="number-of-reviews text-muted">(69 reviews)</p>
              </div>
            </div>
            <div className="product-price">
              Price
              <h1>₹{price}</h1>
            </div>
            <div className="product-control-form">
              <div className="product-quantity">
                <i className="fa-solid fa-minus"></i>1
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="product-buy-cart">
                <div className="product-buy">Buy Now</div>
                <div
                  className="product-cart"
                  onClick={() => {
                    addToCart(props.data._id);
                  }}
                >
                  Add to Cart
                </div>
              </div>
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
                  style={{
                    margin: "0",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setMessage("")}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </p>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
