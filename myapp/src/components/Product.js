import React, { useState } from "react";
import axios from "axios";
import "./Product.css";
import { useSoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Product = ({
  id,
  price,
  image,
  name,
  discount,
  color,
  size,
  description,
  amount,
}) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useSoppingCart();
  const quantity = getItemQuantity(id);

  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  async function fetchProductDetails() {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      console.log(response);
      setShowDetails(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch product details.");
    }
  }
  return (
    // SHOW CARD STRUCTURE
    <div className="product">
      <div className="product-info">
        <p>{name}</p>
        <p>الخصم : {discount}</p>
        <p className="product-price">
          <strong>السعر: {price}</strong>
        </p>
      </div>
      <img src={image} alt="product" />
      <button className="show-btn" onClick={fetchProductDetails}>
        Show Details
      </button>
      {showDetails &&
        navigate("/details", {
          state: {
            id: id,
            name: name,
            image: image,
            color: color,
            size: size,
            description: description,
            price: price,
            amount: amount,
          },
        })}
      {quantity === 0 ? (
        <button className="add-btn" onClick={() => increaseCartQuantity(id)}>
          Add To Cart
        </button>
      ) : (
        <div className="inc_dec_remove">
          <div className="inc_dec">
            <button onClick={() => decreaseCartQuantity(id)} className="dec">
              -
            </button>
            <span className="quantity">{quantity} item in cart</span>
            <button onClick={() => increaseCartQuantity(id)} className="inc">
              +
            </button>
          </div>
          <button className="remove" onClick={() => removeFromCart(id)}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
