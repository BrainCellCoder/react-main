import React from "react";
import "./Hero2.css";
import { Link } from "react-router-dom";
export const Hero2 = () => {
  return (
    <>
      <div className="hero2 container">
        <h1>
          {/* Grab Upto 50% Off On <br />
          Selected Headphone */}
          Add the perfect finishing touch <br /> with our Accessories
        </h1>
        <Link className="accessories-explore" to="/accessories">
          Explore
        </Link>
      </div>
    </>
  );
};
