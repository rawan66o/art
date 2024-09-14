import React from "react";
import ReactDOM from "react-dom";
import "./Header.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSoppingCart } from "../context/ShoppingCartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../images/photo_2024-04-28_14-55-52.jpg";
import shoppingCart from "../images/shopping-cart.png";
import { useEffect, useState } from "react";
import { TbGridDots } from "react-icons/tb";
// import video from '../images/5086645-uhd_3840_2160_30fps.mp4';

const Header = () => {
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("token"));
  // console.log(user);
  // const logout = async () => {
  //   try {
  //     await axios.post("https://mall.ahmadkouja.com/api/auth/logout", user, {
  //       headers: {
  //         method: "POST",
  //         Accept: "*/*",
  //         "Accept-Encoding": "gzip, deflate, br, zstd",
  //         "Accept-Language": "ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user}`, // add the Bearer token here
  //       },
  //     });

  //     localStorage.removeItem("user-info");

  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to log out.");
  //   }
  // };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    } else {
      setUser(null);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post("https://mall.ahmadkouja.com/api/auth/logout", user, {
        headers: {
          method: "POST",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`, // add the Bearer token here
        },
      });

      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to log out.");
    }
  };

  const { openCart, cartQuantity } = useSoppingCart();
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo">URANUS</h2>
      </Link>

      <div className="header-nav">
        {/* <Link to="/signin" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Hello</span>
            <span className="header-optionLineTwo">sign In</span>
          </div>
        </Link> */}
        <ul>
          {user ? (
            <>
              <li>
                <button
                  style={{
                    backgroundColor: "#040303",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                  className="header-optionLineTwo"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <div className="header-option">
                  <span className="header-optionLineTwo">Signin</span>
                </div>
              </Link>
            </>
          )}
        </ul>

        <Link to="/womman" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Clothes</span>
            <span className="header-optionLineTwo">Wommen</span>
          </div>
        </Link>

        <Link to="/body" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Clothes</span>
            <span className="header-optionLineTwo">men</span>
          </div>
        </Link>

        <Link to="/children " style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Clothes</span>
            <span className="header-optionLineTwo">children</span>
          </div>
        </Link>

        <Link to="/makeup" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">original</span>
            <span className="header-optionLineTwo">Makeup</span>
          </div>
        </Link>

        <Link to="/Perfunes" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Beutiful</span>
            <span className="header-optionLineTwo">Perfunes</span>
          </div>
        </Link>

        <Link to="/accessories" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Shiny</span>
            <span className="header-optionLineTwo">accessories</span>
          </div>
        </Link>

        <Link to="/Furniture" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Home</span>
            <span className="header-optionLineTwo">Furniture</span>
          </div>
        </Link>

        <Link to="/techniques" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-optionLineOne">Modern </span>
            <span className="header-optionLineTwo">techniques</span>
          </div>
        </Link>
        <Button
          className="cart-button"
          style={{
            width: "3rem",
            height: "3rem",
            position: "relative",
            borderRadius: "50%",
            backgroundColor: "#040303",
            color: "white",
          }}
          onClick={openCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div
            className="d-f justify-content-center align-items-center rounded-circle"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              transform: "translate(25%, 25%)",
              width: "1.5rem",
              height: "1.5rem",
              color: "white",
              backgroundColor: "#A86464",
            }}
          >
            {cartQuantity}
          </div>
        </Button>
      </div>
      {/* <h2
        className="naving"
        onClick={() => {
          const headerNav = document.querySelector(".header-nav");
          const currentTop = headerNav.style.top;
          headerNav.style.top = currentTop === "330%" ? "-330%" : "330%";
        }}
      >
        <TbGridDots />
      </h2> */}

      <h2
        className="naving"
        onClick={() => {
          const headerNav = document.querySelector(".header-nav");
          const currentTop = headerNav.style.top;
          if (currentTop === "330%") {
            headerNav.style.top = "-330%";
            ReactDOM.render(
              <TbGridDots />,
              document.getElementById("nav-icon")
            );
          } else {
            headerNav.style.top = "330%";
            ReactDOM.render(
              <AiFillCloseCircle />,
              document.getElementById("nav-icon")
            );
          }
        }}
      >
        <div id="nav-icon">
          {" "}
          <TbGridDots />{" "}
        </div>{" "}
      </h2>
    </div>
  );
};

export default Header;
