import React from "react";
import "./CardDetails.css";

export const CardDetails = (props) => {
  const imageUrl = props.data.image ? props.data.image[0].url : null;
  const price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(props.data.price);
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
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </p>
                <p className="number-of-reviews text-muted">(69 reviews)</p>
              </div>
            </div>
            <div className="product-price">
              Price
              <h1>₹{price}</h1>
            </div>
            <div className="product-control-form">
              <div className="product-quantity">
                <div className="choose-quantity">
                  <button>-</button>1<button>+</button>
                </div>
                <div className="product-stock">
                  Only 25 left!
                  <br /> Don't miss it
                </div>
              </div>
              <div className="product-buy-cart">
                <div className="product-buy">Buy Now</div>
                <div className="product-cart">Add to Cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
