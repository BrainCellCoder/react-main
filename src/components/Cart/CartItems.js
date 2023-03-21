import React from "react";
import "./CartItems.css";

export const CartItems = (props) => {
  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const cartRemoveHandler = async (id) => {
    await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
      },
    });
  };

  const addToWishList = async (id) => {
    await fetch(`http://localhost:8000/user/wishlist/${id}`, {
      method: "POST",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      {props.cartLength ? (
        <div className="cart-item">
          <div className="product-image">
            <img src={imgURL} />
          </div>
          <div className="product-information">
            <div className="product-name-price">
              <h5 className="product-name">{props.data.name}</h5>
              <h5 className="product-price">₹ {price}</h5>
            </div>
            <p className="cart-item-stock">In Stock</p>
            <div className="product-control">
              <div className="product-quantity">
                <i className="fa-solid fa-minus"></i>1
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="product-wishlist-remove">
                <div
                  className="product-wishlist"
                  onClick={() => {
                    addToWishList(props.data._id);
                  }}
                >
                  <i className="fa-regular fa-heart"></i> Wishlist
                </div>
                <div
                  className="product-remove"
                  onClick={() => {
                    cartRemoveHandler(props.data._id);
                  }}
                >
                  <i className="fa-solid fa-x"></i> Remove
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cart is empt</p>
      )}
    </>
  );
};
