import React from "react";
import { useSearchParams } from "react-router-dom";

export const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  return (
    <>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <div>PaymentSuccess</div>
      <p>Reference ID: {searchQuery.get("reference")}</p>
    </>
  );
};
