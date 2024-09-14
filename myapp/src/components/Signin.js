import React, { useState } from "react";
// import loginLogo from "../images/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from "axios";

const Signin = () => {
  // ====================
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // add an errors state to store validation errors
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    const errors = {}; // initialize an empty errors object
    if (name.trim() === "") {
      errors.name = "Name is required";
    }
    if (email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (password_confirmation.trim() === "") {
      errors.password_confirmation = "Repeat password is required";
    } else if (password !== password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // update the errors state if there are any validation errors
      return;
    }

    let item = { email, password, password_confirmation };
    try {
      const response = await axios.post(
        "https://mall.ahmadkouja.com/api/auth/register",
        item
      );
      console.log(response.data);
      // const token = response.data.access_token;
      localStorage.setItem("user-info", JSON.stringify(response.data));
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errors.email = "The email is already taken";
        setErrors(errors);
      } else {
        console.error(error);
        alert("Registration failed, please try again later.");
      }
    }
  }

  // =====================
  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo auth">URANUS</h2>
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>User Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}

          <h5>Repeat Password</h5>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.password_confirmation && (
            <div style={{ color: "red" }}>{errors.password_confirmation}</div>
          )}

          <button className="login-signInBtn" type="submit" onClick={register}>
            Sign in
          </button>

          <div className="account ">
            <p>if you have an account</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
