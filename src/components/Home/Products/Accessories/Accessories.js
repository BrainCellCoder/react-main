import React from "react";
import "./Accessories.css";
import { Card } from "../Card";
import { useLocation } from "react-router-dom";
import { SearchProducts } from "../../../SearchProducts";

export const Accessories = (props) => {
  const location = useLocation();
  return (
    <>
      {props.searchProducts.length > 0 && (
        <SearchProducts data={props.searchProducts} />
      )}
      <div
        className="products"
        style={{ marginTop: "100px", marginBottom: "5rem", minHeight: "70vh" }}
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
