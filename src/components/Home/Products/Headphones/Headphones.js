import React from "react";
import "./Headphones.css";
import { useEffect, useState } from "react";
import { Card } from "../Card";

export const Headphones = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function headphone() {
      setLoading(true);
      const res = await fetch(
        "https://rose-doubtful-moth.cyclic.app/products?category=headphone"
      );
      const product = await res.json();
      setProducts(product.products);
      setLoading(false);
    }
    headphone();
  }, []);
  return (
    <>
      <div className="products container">
        <h3>Headphones</h3>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="row gy-4">
            {products.map((product, key) => {
              return <Card key={key} data={product} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};
