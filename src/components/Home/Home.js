import React, { useEffect, useState } from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
import { Laptops } from "./Products/Laptops/Laptops";
import { Hero2 } from "./Hero2/Hero2";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function allProducts() {
      const res = await fetch("http://localhost:8000/products");
      const product = await res.json();
      setProducts(product.products);
    }
    allProducts();
  }, []);

  const laptops = products.filter((product) => product.category === "Laptop");
  const phones = products.filter((product) => product.category === "Mobile");
  const headPhones = products.filter(
    (product) => product.category === "Headphone"
  );
  const accessories = products.filter(
    (product) => product.category === "Accessories"
  );

  return (
    <>
      <Hero data={headPhones} />
      <Filter />
      <Phones data={phones} />
      <Laptops data={laptops} />
      <Hero2 data={accessories} />
    </>
  );
};
