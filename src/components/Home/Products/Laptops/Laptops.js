import React from "react";
import { Card } from "../Card";

export const Laptops = (props) => {
  return (
    <>
      <div className="products animate__animated  animate__fadeInLeft">
        <h3>Best Laptops of 2023: Top Picks</h3>
        {/* <button onClick={lowToHigh}>Sort L-H</button> */}
        <div className="row gy-5">
          {props.data.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
