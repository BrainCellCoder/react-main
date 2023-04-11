import React, { useEffect, useState } from "react";
import "./CartItems.css";

export const CartItems = (props) => {
  // console.log(props.data.quantity);
  const [quantity, setQuantity] = useState(props.data.quantity);

  const imgURL = props.data.productId.image[0].url;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.productId.price);

  const cartRemoveHandler = async (id) => {
    const res = await fetch(`http://localhost:8000/user/cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Abhi ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
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

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
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
              <h5 className="product-name">{props.data.productId.name}</h5>
              <h5 className="product-price">₹ {price}</h5>
            </div>
            <p className="cart-item-stock">In Stock</p>
            <div className="product-control">
              <div className="product-quantity">
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
              <div className="product-wishlist-remove">
                <div
                  className="product-wishlist"
                  onClick={() => {
                    addToWishList(props.data.productId._id);
                  }}
                >
                  <i className="fa-regular fa-heart"></i> Wishlist
                </div>
                <div
                  className="product-remove"
                  onClick={() => {
                    cartRemoveHandler(props.data.productId._id);
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
