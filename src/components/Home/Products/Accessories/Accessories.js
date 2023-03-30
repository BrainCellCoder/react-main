import React from "react";
import "./Accessories.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";

export const Accessories = (props) => {
  const location = useLocation();
  return (
    <>
      <div id="headphone" className="products container">
        <h3>Accessories</h3>
        <div className="row gy-5">
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
