import React from "react";
import "./Accessories.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";

export const Accessories = (props) => {
  const location = useLocation();
  return (
    <>
      <div className="accessories-clip-path">
        <h1 className="container">ACCESSORIES</h1>
      </div>
      <div id="headphone" className="products container">
        <h3>Accessories</h3>
        <div className="accessories-items row gy-5">
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
