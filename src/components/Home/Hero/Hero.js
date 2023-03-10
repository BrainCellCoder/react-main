import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <>
      <div className="hero container">
        <h1>
          {/* Grab Upto 50% Off On <br />
          Selected Headphone */}
          Find your perfect sound <br /> with our headphones.
        </h1>
        <Link className="headphones-buy-now" to="/headphones">
          Buy now
        </Link>
      </div>
    </>
  );
};
