import React from "react";
import "./CartItems.css";

export const CartItems = (props) => {
  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);
  return (
    <>
      <div className="cart-item">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${imgURL})` }}
        ></div>
        <div className="product-information">
          <div className="product-name-price">
            <h4 className="product-name">{props.data.name}</h4>
            <h4 className="product-price">$ {price}</h4>
          </div>
          <p className="stock">In Stock</p>
          <div className="product-control">
            <div className="product-quantity">
              <i class="fa-solid fa-minus"></i>1<i class="fa-solid fa-plus"></i>
            </div>
            <div className="product-wishlist-remove">
              <div className="product-wishlist">
                <i class="fa-regular fa-heart"></i> Wishlist
              </div>
              <div className="product-remove">
                <i class="fa-solid fa-x"></i> Remove
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
