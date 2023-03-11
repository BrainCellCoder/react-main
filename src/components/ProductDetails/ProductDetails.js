import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./ProductDetails.css";
import { baseUrl } from "../../Utils/baseUrl";
import { CardDetails } from "./CardDetails";

export const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`${baseUrl}/products/${id}`);
      const product = await res.json();
      setData(product.product);
    }
    getProduct();
  }, [id]);

  return (
    <>
      <CardDetails data={data} />
    </>
  );
};
