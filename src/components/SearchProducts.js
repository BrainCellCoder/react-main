import React from "react";
import "./Home/Products/Phones/Phones.css";
import { Card } from "./Home/Products/Card";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const SearchProducts = (props) => {
  const goHome = () => {
    window.location.reload();
  };
  return (
    <>
      <div
        className="products"
        style={{ minHeight: "61vh", marginTop: "100px" }}
      >
        <h3>
          You have searched for...
          <Button
            style={{ marginLeft: "100px" }}
            variant="outlined"
            onClick={goHome}
          >
            Go to Home
          </Button>
        </h3>
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
