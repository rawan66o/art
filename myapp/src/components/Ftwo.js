import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

function Ftwo() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [vertifyEmail, setVertifyEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://mall.ahmadkouja.com/api/auth/verify-reset-code",
        data: {
          email: email,
          code: code,
        },
      });
      setSuccess("Reset code verified successfully!");
      setError(null);
      setVertifyEmail(true);
    } catch (error) {
      setError("Invalid reset code or email!");
      setSuccess(null);
    }
  };

  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo auth">URANUS</h2>
      </Link>
      <div className="login-container">
        <h2>Verify Reset Code</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Reset Code:</label>
          <input type="text" value={code} onChange={handleCodeChange} />
          <button className="login-signInBtn" type="submit">
            Verify Reset Code
          </button>
          {vertifyEmail && navigate("/f3")}
        </form>
        {error && <p style={{ color: "ed" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
}

export default Ftwo;
