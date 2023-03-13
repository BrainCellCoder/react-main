import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { baseUrl } from "./../../../Utils/baseUrl";

export const Card = (props) => {
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
    console.log(res);
    const data = await res.json();
    console.log(data);
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
          <Link className="view" to={`products/${props.data._id}`}>
            View
          </Link>
        </div>
        <div className="wish">
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  );
};
