import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
export const Hero = (props) => {
  return (
    <>
      <div className="hero container">
        <h1>
          Find your perfect sound <br /> with our Headphones.
        </h1>
        <Link
          className="headphones-buy-now"
          to={"/headphones"}
          state={{ product: props.data }}
        >
          Buy now
        </Link>
      </div>
    </>
  );
};
