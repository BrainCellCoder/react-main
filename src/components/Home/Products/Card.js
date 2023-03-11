import React from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);
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
          <div className="add-to-cart">Add to cart</div>
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
