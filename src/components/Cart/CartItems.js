import React from "react";
import "./CartItems.css";

export const CartItems = (props) => {
  const imgURL = props.data.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);

  const cartRemoveHandler = async (id) => {
    const res = await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
      },
    });
    const resp = await res.json();
    console.log(resp);
  };

  return (
    <>
      <div className="cart-item">
        <div className="product-image">
          <img src={imgURL} />
        </div>
        <div className="product-information">
          <div className="product-name-price">
            <h4 className="product-name">{props.data.name}</h4>
            <h4 className="product-price">₹ {price}</h4>
          </div>
          <p className="cart-item-stock">In Stock</p>
          <div className="product-control">
            <div className="product-quantity">
              <i className="fa-solid fa-minus"></i>1
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="product-wishlist-remove">
              <div className="product-wishlist">
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
    </>
  );
};
