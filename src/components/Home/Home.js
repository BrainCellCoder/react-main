import React, { useState } from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
import { Laptops } from "./Products/Laptops/Laptops";
import { Hero2 } from "./Hero2/Hero2";
import { Headphones } from "./Products/Headphones/Headphones";
import { Accessories } from "./Products/Accessories/Accessories";

export const Home = () => {
  const [cat, setCat] = useState("");
  return (
    <>
      <Hero />
      <Filter cat={setCat} />
      {cat === "phones" && <Phones />}
      {cat === "laptops" && <Laptops />}
      {cat === "headphones" && <Headphones />}
      {cat === "accessories" && <Accessories />}
      {cat === "" && (
        <>
          <Phones /> <Laptops />
        </>
      )}
      <Hero2 />
    </>
  );
};
