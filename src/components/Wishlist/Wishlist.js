import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { WishlistItems } from "./WishlistItems";

export const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setWishItems(data.user.wishList);
    };
    fetchWishlist();
  }, [wishItems]);
  console.log(wishItems);
  return (
    <>
      {wishItems.map((item, key) => (
        <WishlistItems key={key} data={item} />
      ))}
    </>
  );
};
