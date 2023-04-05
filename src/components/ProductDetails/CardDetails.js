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
  const [toggle, setToggle] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const { id } = useParams();

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
    const data = await res.json();
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
        setToggle(!toggle);
      })
      .catch((error) => {
        console.error(error);
      });
    setRating(0);
    setComment("");
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`http://localhost:8000/products/${id}`, {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setReviews(data.product.reviews);
      setAvgRating(data.product.rating);
      setNumReviews(data.product.numOfReviews);
    };
    fetchReviews();
  }, [toggle]);

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
                  <StarRating rating={avgRating} />
                </p>
                <p className="number-of-reviews text-muted">
                  ({numReviews} reviews)
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
        <hr />
        <div className="row">
          <div className="col-md-6 leave-review">
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit} className="border border-3">
              <Rating
                count={5}
                value={rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
              <textarea
                className="border border-3"
                value={comment}
                onChange={handleCommentChange}
              />
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h3>Product Reviews</h3>
            <div className="reviews">
              {reviews?.map((review, key) => (
                <div key={key}>
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
        </div>
      </div>
    </>
  );
};
