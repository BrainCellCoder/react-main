import React from "react";
import "./Filter.css";
export const Filter = (props) => {
  const onChange = (event) => {
    props.cat(event.target.value);
  };
  return (
    <>
      <div className="filters container">
        <div className="category">
          <select onChange={onChange}>
            <option>Category Type</option>
            <option value="">All</option>
            <option value="laptops">Laptop</option>
            <option value="phones">Phone</option>
            <option value="headphones">Headphone</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="price">
          <select>
            <option>Price</option>
            <option value="">All</option>
            <option value="Laptop">High-Low</option>
            <option value="Mobile">Low-High</option>
          </select>
        </div>
        {/* <div className="reviews">
          <select>
            <option>Reviews</option>
            <option value="">All</option>
            <option value="Laptop">5 stars</option>
            <option value="Mobile">4 stars</option>
            <option value="Mobile">3 stars</option>
            <option value="Mobile">2 stars</option>
            <option value="Mobile">1 stars</option>
            <option value="Mobile">Best-Worst</option>
            <option value="Mobile">Worst-Best</option>
          </select>
        </div> */}
        {/* <div className="color">
          Color <i className="fa-solid fa-caret-down"></i>
        </div> */}
      </div>
    </>
  );
};
