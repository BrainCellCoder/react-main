import React from "react";
import "./Headphones.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";
import { SearchProducts } from "../../../SearchProducts";

export const Headphones = (props) => {
  const location = useLocation();

  return (
    <>
      {props.searchProducts.length > 0 && (
        <SearchProducts data={props.searchProducts} />
      )}
      <div
        className="products animate__animated  animate__fadeInLeft"
        style={{ marginTop: "100px", marginBottom: "5rem", minHeight: "70vh" }}
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
