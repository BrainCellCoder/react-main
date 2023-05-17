import React, { useEffect, useState } from "react";
import "../Phones/Phones.css";
import { Card } from "../Card";

export const Gaming = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchTv = async () => {
      const res = await fetch(
        "http://localhost:8000/products?category=gaming",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    };
    fetchTv();
  }, []);
  return (
    <>
      <div
        className="products"
        style={{ marginTop: "100px", minHeight: "70vh" }}
      >
        <div className="row gy-5">
          {products.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
