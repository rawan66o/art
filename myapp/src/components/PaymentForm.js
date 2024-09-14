import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentForm.css";
import imagehome from "../images/6e3d456d0e.jpg";

const PaymentForm = () => {
  const [visaNumber, setVisaNumber] = useState("");

  async function makePayment(e) {
    e.preventDefault();
    try {
      const paymentData = {
        stripeToken: "tok_visa",
      };
      const response = await axios.post(
        "https://mall.ahmadkouja.com/api/process-payment",
        paymentData
      );
      console.log(response.data);
      alert("Payment successful!");
    } catch (error) {
      console.error(error);
      alert("Payment failed, please try again later.");
    }
  }

  return (
    <>
      <div className="payment-form">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo auth">URANUS</h2>
        </Link>
        <div className="payment-form-container">
          <img
            src={imagehome}
            alt="Payment Background"
            className="payment-bg"
          />
          <div className="payment-form-content">
            <h1 style={{ zIndex: "100" }}>Make a Payment</h1>
            <form style={{ zIndex: "100" }} onSubmit={makePayment}>
              <h5>Visa Number</h5>
              <input
                type="text"
                value={visaNumber}
                onChange={(e) => setVisaNumber(e.target.value)}
                className="payment-input"
              />

              <button className="payment-btn" type="submit">
                Make Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
