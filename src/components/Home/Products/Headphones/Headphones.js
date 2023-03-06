import React from "react";
import "./Headphone.css";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export const Headphones = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function headphone() {
      const res = await fetch(
        "https://rose-doubtful-moth.cyclic.app/products?limit=8"
      );
      const product = await res.json();
      setProducts(product.products);
    }
    headphone();
  }, []);
  return (
    <>
      <div className="products container">
        <h3>Headphones For You!</h3>
        <div className="row gy-4">
          {products.map((product) => {
            return <Card data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
