import React from "react";
import "./Phones.css";
import { Card } from "../Card";

export const Phones = (props) => {
  return (
    <>
      <div className="products container">
        <h3>Phones For You!</h3>
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
