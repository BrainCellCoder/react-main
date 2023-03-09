import React from "react";

export const Card = (props) => {
  const imgURL = props.data.image[0].url;
  return (
    <div className="col-lg-3 col-md-6">
      <div className="product">
        <div
          className="image"
          style={{ backgroundImage: `url(${imgURL})` }}
        ></div>
        <div className="title">
          <h5 className="name">{props.data.name}</h5>
          <h5 className="price">₹{props.data.price}</h5>
        </div>
        {/* <div className="description text-muted">{props.data.description}</div> */}
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
        <div className="add-to-cart">Add to cart</div>
        <div className="wish">
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  );
};
