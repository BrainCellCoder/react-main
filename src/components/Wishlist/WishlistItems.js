import React from "react";

export const WishlistItems = (props) => {
  return (
    <>
      <p>{props.data.name}</p>
      <p>{props.data.price}</p>
      <p>{props.data.description}</p>
    </>
  );
};
