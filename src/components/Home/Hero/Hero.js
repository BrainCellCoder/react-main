import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { Headphones } from "../Products/Headphones/Headphones";
export const Hero = () => {
  return (
    <>
      <div className="hero container">
        <h1>
          Grab Upto 50% Off On <br />
          Selected Headphone
        </h1>
        <button>Buy now</button>
      </div>
    </>
  );
};
