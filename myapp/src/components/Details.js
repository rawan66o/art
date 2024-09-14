import React from "react";
import { useLocation } from "react-router-dom";
import { useSoppingCart } from "../context/ShoppingCartContext";

import "./Details.css";
const Details = () => {
  const location = useLocation();
  const { state } = location;
  const { id, name, image, color, description, price, size, amount } = state;
  const { cartItems } = useSoppingCart();

  const itemInCart = cartItems.find((item) => item.id === id);
  const remainingAmount = amount - (itemInCart ? itemInCart.quantity : 0);
  return (
    <div>
      <div className="details">
        <div className="info-details">
          <h1 style={{ color: "#A86464" }}>تفاصيل المنتج</h1>
          <p>
            <h5 style={{ color: "#040303" }}>اسم المنتج </h5>
            {name}
          </p>
          <p>
            <h5 style={{ color: "#040303" }}>بعدvsكمية المنتج قبل </h5>
            {amount} vs {remainingAmount}
          </p>
          {/* <p>
            <h5 style={{ color: "#040303" }}>كمية المنتج بعد </h5>
            {remainingAmount}
          </p> */}
          <p>
            <h5 style={{ color: "#040303" }}>حجم المنتج </h5>
            {size}
          </p>
          <p>
            <h5 style={{ color: "#040303" }}>لون المنتج </h5>
            {color}
          </p>
          <p>
            <h5 style={{ color: "#040303" }}>سعر المنتج </h5>
            {price}
          </p>
          <p style={{ maxWidth: "250px" }}>
            <h5 style={{ color: "#040303" }}>وصف المنتج </h5>
            {description}
          </p>
        </div>
        <div className="image-details">
          <img src={image} />
        </div>
      </div>
    </div>
  );
};

export default Details;
