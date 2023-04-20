import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./CardDetails.css";
import Rating from "react-rating-stars-component";
import StarRating from "./StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
// import Razorpay from "razor";

import "../../Utils/star.css";

export const CardDetails = (props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [cookies, setCookie] = useCookies(["userId", "token"]);

  const imageUrl = props.data.image ? props.data.image[0].url : null;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const addToCart = async (id) => {
    const res = await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
      }),
    });
    console.log({ id, quantity });
    const data = await res.json();
    console.log(data);
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
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
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
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();
      setReviews(data.product.reviews);
      setAvgRating(data.product.rating);
      setNumReviews(data.product.numOfReviews);
    };
    fetchReviews();
  }, [toggle]);

  const checkoutHandler = async () => {
    console.log(props.data);
    const price = props.data.price;
    const productId = props.data._id;
    const keyRes = await fetch("http://localhost:8000/getkey");
    const keyResp = await keyRes.json();

    const res = await fetch("http://localhost:8000/payment/checkout", {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
        quantity: quantity,
        productId,
        user: localStorage.getItem("user_id") || cookies.userId,
      }),
    });
    const resp = await res.json();

    const user = await fetch("http://localhost:8000/user/me", {
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = await user.json();

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
    razor.open();
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
                <StarRating rating={avgRating} />
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
              <div className="pro-quantity">
                <label for="quantity">Quantity:</label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="product-buy-cart">
                <div className="product-buy" onClick={checkoutHandler}>
                  Buy Now
                </div>
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
            <ToastContainer
              position="bottom-center"
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
