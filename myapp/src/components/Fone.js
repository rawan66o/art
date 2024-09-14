import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

const Fone = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://mall.ahmadkouja.com/api/auth/forgot_password", {
        email: email,
      })
      .then((response) => {
        setSuccess("Email sent successfully!");
        setError(null);
        setSendEmail(true);
      })
      .catch((error) => {
        setError("Error sending email!");
        setSuccess(null);
      });
  };

  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo auth">URANUS</h2>
      </Link>
      <div className="login-container">
        <h2>Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <button type="submit" className="login-signInBtn">
            Send Email
          </button>

          {sendEmail && navigate("/f2")}
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
};

export default Fone;
