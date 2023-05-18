import React from "react";
import "./Home/Products/Phones/Phones.css";
import { Card } from "./Home/Products/Card";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
        <Button variant="outlined" onClick={goHome}>
          <ArrowBackIcon /> Back
        </Button>
        <h4 style={{ margin: "20px 0" }}>You have searched for...</h4>
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
