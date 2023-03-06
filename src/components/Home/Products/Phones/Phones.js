import React from "react";
import "./Phones.css";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export const Phones = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function headphone() {
      const res = await fetch(
        "https://rose-doubtful-moth.cyclic.app/products?category=headphone"
      );
      const product = await res.json();
      setProducts(product.products);
    }
    headphone();
  }, []);
  return (
    <>
      <div className="products container">
        <h3>Phones For You!</h3>
        <div className="row gy-4">
          {products.map((product, key) => {
            return <Card key={key} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};
