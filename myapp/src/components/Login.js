import React, { useState } from "react";
// import loginLogo from "../images/login-logo.png";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
// import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // add an errors state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {}; // initialize errors object

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

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "https://mall.ahmadkouja.com/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.access_token;
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");

      // handle token here
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError("Network error");
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo auth">URANUS</h2>
      </Link>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}

          <br />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="login-signInBtn" type="submit">
            Login in
          </button>
          <button className="login-registerBtn">
            <Link
              to="/f1"
              style={{
                "text-decoration": "none",
                color: "black",
              }}
            >
              forget your password
            </Link>
          </button>

          <div className="account ">
            <p>if you have not an account</p>
            <Link to="/signin">Signin</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
