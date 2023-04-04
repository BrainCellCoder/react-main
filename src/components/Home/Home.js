import React, { useEffect, useState } from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
import { Laptops } from "./Products/Laptops/Laptops";
import { Hero2 } from "./Hero2/Hero2";
import { FilteredCategory } from "./FilteredCategory/FilteredCategory";
export const Home = () => {
  const [cat, setCat] = useState("all");
  const [products, setProducts] = useState([]);
  const [filterDep, setFilterDep] = useState(false);
  useEffect(() => {
    async function allProducts() {
      const res = await fetch("http://localhost:8000/products");
      const product = await res.json();
      setProducts(product.products);
    }
    allProducts();
    console.log("use effect render");
  }, []);
  const lowToHigh = () => {
    const sortProducts = products.sort((a, b) => a.price - b.price);
    setProducts(sortProducts);
    setFilterDep(!filterDep);
    console.log("ooo");
  };
  const highToLow = () => {
    const sortProducts = products.sort((a, b) => b.price - a.price);
    setProducts(sortProducts);
    setFilterDep(!filterDep);
    console.log("ooo");
  };
  const laptops = products.filter((product) => product.category === "Laptop");
  const phones = products.filter((product) => product.category === "Mobile");
  const headPhones = products.filter(
    (product) => product.category === "Headphone"
  );
  const accessories = products.filter(
    (product) => product.category === "Accessories"
  );
  console.log({ phones });
  return (
    <>
      <Hero data={headPhones} />
      <Filter
        cat={setCat}
        products={products}
        lowToHigh={lowToHigh}
        highToLow={highToLow}
      />
      {cat === "all" && (
        <>
          <Phones data={phones} />
          <Laptops data={laptops} />
          <Hero2 data={accessories} />
        </>
      )}
      {cat === "laptops" && <FilteredCategory data={laptops} />}
      {cat === "phones" && <FilteredCategory data={phones} />}
      {cat === "headphones" && <FilteredCategory data={headPhones} />}
      {cat === "accessories" && <FilteredCategory data={accessories} />}
    </>
  );
};
