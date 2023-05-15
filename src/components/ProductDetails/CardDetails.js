import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./CardDetails.css";
import Rating from "react-rating-stars-component";
import StarRating from "./StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../Utils/star.css";
import { Grid, Paper, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageUrl = props.data.image ? props.data.image[0].url : null;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

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

  const addToWishlist = async (id) => {
    const res = await fetch(`http://localhost:8000/user/wishlist/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token") || cookies.token}`,
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
    console.log("rrrr");
    console.log(rating, comment);
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
        // handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
    setRating(0);
    setComment("");
    handleClose();
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
                <span className="number-of-reviews text-muted">
                  ({numReviews} reviews)
                </span>
                <div className="rate-product">
                  <Button
                    onClick={handleOpen}
                    variant="outlined"
                    color="warning"
                    sx={{ fontWeight: "500", border: "1px solid" }}
                  >
                    Rate this Product
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <form onSubmit={handleSubmit}>
                        <Rating
                          name="star-rating"
                          value={rating}
                          onChange={handleRatingChange}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Comment"
                          multiline
                          maxRows={4}
                          fullWidth
                          onChange={handleCommentChange}
                          required
                        />

                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="product-price">
              Price
              <h1>₹{price}</h1>
            </div>
            <div className="product-control-form">
              {/* <div className="pro-quantity">
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
              </div> */}
              <div className="product-buy-cart">
                <div
                  className="product-buy"
                  onClick={() => {
                    addToWishlist(props.data._id);
                  }}
                >
                  Add to Wish list
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
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Reviews
        </Typography>
        <Grid container spacing={2}>
          {reviews.map((review, key) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  style={{
                    minHeight: 110,
                    backgroundColor: "#f8f9fa",
                    padding: "0.5rem",
                  }}
                >
                  <Chip
                    avatar={
                      <Avatar sx={{ backgroundColor: "#f9bec7" }}>
                        {review.author?.name.charAt(0)}
                      </Avatar>
                    }
                    label={review.author?.name}
                    variant="outlined"
                  />
                  <StarRating rating={review.rating} />
                  {review.comment}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
