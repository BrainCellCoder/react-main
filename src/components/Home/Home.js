import React from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
import { Laptops } from "./Products/Laptops/Laptops";
export const Home = () => {
  return (
    <>
      <Hero />
      <Filter />
      <Phones />
      <Laptops />
    </>
  );
};
