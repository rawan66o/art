import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useSoppingCart } from "../context/ShoppingCartContext";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";

const ShoppingCard = ({ isOpen }) => {
  const { cartItems, closeCart, posts } = useSoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{"  "}
            {/* { cartItems.reduce((total, cartItem) => {
                const item = posts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            } */}
            {cartItems.reduce((total, cartItem) => {
              const item = posts.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
        <Link to="/pay" style={{ textDecoration: "none" }}>
          <h2 className="logo">pay</h2>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCard;
