import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    let item = { name,email,password };
    console.warn(item);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", item);
      console.log(response);
      localStorage.setItem("user-info", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed, please try again later.");
    }
  }

  return (
    <div className="login">
      <Link to="/">
        <h2 className="logo">URANUS</h2>
      </Link>
      <div className="login-container">
        <h1>Register</h1>
        <form>
          <h5>User Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-signInBtn" type="submit" onClick={register}>
            Register
          </button>

          <button className="login-registerBtn">
            Already have an account?
          </button>
          <div className="account ">
            <p>Login</p>
            <Link to="/login">here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;