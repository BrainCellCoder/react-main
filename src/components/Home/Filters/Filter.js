import React from "react";
import "./Filter.css";
export const Filter = () => {
  return (
    <>
      <div className="filters container">
        <div className="category">
          Category Type <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className="price">
          Price <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className="reviews">
          Reviews <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className="color">
          Color <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
    </>
  );
};
