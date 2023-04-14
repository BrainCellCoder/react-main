import React, { useEffect, useState } from "react";
import { Card } from "../Home/Products/Card";
import "./Wishlist.css";

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
      setWishItems(data.user.wishList);
    };
    fetchWishlist();
  });
  return (
    <section style={{ minHeight: "100vh", marginTop: "100px" }}>
      <div className="container">
        <h3>My Wishlist ({wishItems.length})</h3>
        <div className="row gy-5">
          {wishItems.map((item, key) => (
            <Card key={key} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
