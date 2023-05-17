import React from "react";
import "./Accessories.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";

export const Accessories = (props) => {
  const location = useLocation();
  return (
    <>
      <div
        className="products"
        style={{ marginTop: "100px", minHeight: "70vh" }}
      >
        <h1>Accessories</h1>
        <div className="accessories-items row gy-5">
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
