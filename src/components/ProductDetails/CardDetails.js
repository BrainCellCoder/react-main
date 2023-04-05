import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./CardDetails.css";
import { Alert } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import StarRating from "./StarRating";

import "../../Utils/star.css";

export const CardDetails = (props) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submit, setSubmit] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`http://localhost:8000/products/${id}`, {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setReviews(data.product.reviews);
    };
    fetchReviews();
  }, [submit]);

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

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/review/${props.data._id}/new`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        rating: rating,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send rating and comment");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setRating(0);
    setComment("");
    setSubmit(!submit);
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
                  <StarRating rating={props.data.rating} />
                </p>
                <p className="number-of-reviews text-muted">
                  ({props.data.numOfReviews} reviews)
                </p>
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

      <div className="container product-reviews">
        <div className="leave-review">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <Rating
              count={5}
              value={rating}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
            />
            <textarea value={comment} onChange={handleCommentChange} />
            <button type="submit">Submit</button>
          </form>
        </div>

        <hr />
        <h3>Product Reviews</h3>
        <hr />
        <div className="row gutter-20">
          {reviews?.map((review, key) => (
            <div key={key} className="col-md-4">
              <div className="review">
                <div className="review-name">
                  <span>User: </span>
                  {review.author?.name}
                </div>
                <div className="review-star">
                  <span>Stars: </span>
                  <StarRating rating={review?.rating} />
                </div>
                <div className="review-comment text-muted">
                  <span>Comment: </span>
                  {review?.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
