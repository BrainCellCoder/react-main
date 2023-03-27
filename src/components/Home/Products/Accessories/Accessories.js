import React from "react";
import "./Accessories.css";
import { useEffect, useState } from "react";
import { Card } from "../Card";

export const Accessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function headphone() {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/products?category=accessories"
      );
      const product = await res.json();
      setProducts(product.products);
      setLoading(false);
    }
    headphone();
  }, []);
  return (
    <>
      <div id="headphone" className="products container">
        <h3>Accessories</h3>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="row gy-5">
            {products.map((product, key) => {
              return <Card key={key} data={product} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};
