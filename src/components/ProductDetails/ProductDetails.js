import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { baseUrl } from "../../Utils/baseUrl";

export const ProductDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    async function getProduct() {
      console.log(id);
      const res = await fetch(`${baseUrl}/products/${id}`);
      const data = await res.json();
      console.log(data);
    }
    getProduct();
  }, []);

  return <div style={{ marginTop: "10rem" }}>ProductDetails</div>;
};
