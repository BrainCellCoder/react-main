import React from "react";
import "./Headphones.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";

export const Headphones = () => {
  const location = useLocation();

  return (
    <>
      <div id="headphone" className="products container">
        <h3>Headphones</h3>
        <div className="row gy-5">
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
