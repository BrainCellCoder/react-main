import React from "react";
import { useEffect, useState } from "react";
// import { baseUrl } from "../../../../Utils/baseUrl";
import { Card } from "../Card";

export const Laptops = (props) => {
  // const [products, setProducts] = useState([]);

  // const lowToHigh = () => {
  //   const copyProducts = [...products];
  //   const sortProducts = copyProducts.sort((a, b) => a.price - b.price);
  //   setProducts(sortProducts);
  // };
  // const highToLow = () => {};

  return (
    <>
      <div className="products container">
        <h3>Best Laptops of 2023: Top Picks</h3>
        {/* <button onClick={lowToHigh}>Sort L-H</button> */}
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
