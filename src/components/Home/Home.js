import React from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Headphones } from "./Products/Headphones/Headphones";
export const Home = () => {
  return (
    <>
      <Hero />
      <Filter />
      <Headphones />
    </>
  );
};
