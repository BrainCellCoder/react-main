import React from "react";
import "./Headphones.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";

export const Headphones = () => {
  const location = useLocation();

  return (
    <>
      <div
        className="products"
        style={{ marginTop: "100px", minHeight: "70vh" }}
      >
        <h1>Headphones</h1>
        <div className="headphones-items row gy-5">
          {location.state.product.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
