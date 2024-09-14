import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";

function Fthree() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [password_confirmation, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password_confirmation) {
      setError("Passwords do not match!");
      setSuccess(null);
    } else {
      try {
        const response = await axios({
          method: "post",
          url: "https://mall.ahmadkouja.com/api/auth/reset-password",
          data: {
            email: email,
            code: code,
            password: password,
            password_confirmation: password_confirmation,
          },
        });
        setSuccess("Password reset successfully!");
        setError(null);
        navigate("/");
      } catch (error) {
        setError("Error resetting password!");
        setSuccess(null);
      }
    }
  };

  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo auth">URANUS</h2>
      </Link>
      <div className="login-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Verification Code:</label>
          <input type="text" value={code} onChange={handleCodeChange} />
          <br />
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleNewPasswordChange}
          />
          <br />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password_confirmation}
            onChange={handleConfirmPasswordChange}
          />
          <button className="login-signInBtn" type="submit">
            Reset Password
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>{" "}
    </div>
  );
}

export default Fthree;
