import React from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
export const Home = () => {
  return (
    <>
      <Hero />
      <Filter />
      <Phones />
    </>
  );
};
