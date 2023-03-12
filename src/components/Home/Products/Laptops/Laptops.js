import React from "react";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../Utils/baseUrl";
import { Card } from "../Card";

export const Laptops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function headphone() {
      setLoading(true);
      const res = await fetch(`${baseUrl}/products?category=laptop`);
      const product = await res.json();
      setProducts(product.products);
      setLoading(false);
    }
    headphone();
  }, []);
  return (
    <>
      <div className="products container">
        <h3>Best Laptops of 2023: Top Picks</h3>
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