import React from "react";
import "./Filter.css";
export const Filter = () => {
  return (
    <>
      <div class="filters container">
        <div class="category">
          Category Type <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="price">
          Price <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="reviews">
          Reviews <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="color">
          Color <i class="fa-solid fa-caret-down"></i>
        </div>
      </div>
    </>
  );
};
