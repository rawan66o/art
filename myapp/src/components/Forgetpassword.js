import React, { useState } from "react";
import axios from "axios";
import "./Resaet.css";
import { Link } from "react-router-dom";
const Forgetpassword = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // state variable for email
  const [error, setError] = useState(null); // state variable for error message
  const [isSent, setIsSent] = useState(false); // state variable to track if email has been sent
  const [showPassword, setShowPassword] = React.useState(false);
  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://mall.ahmadkouja.com/api/auth/reset_password",

        {
          nameId: "Rawan",
          password: password,

          // password:password,
        },
        {
          headers: {
            method: "POST",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setError(null);
      setIsSent(true);
      alert("Password reset email sent successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to send password reset email. Please try again later.");
    }
  };

  return (
    <div className="login">
      <h2 className="p1p">إضافة كلمة سر جديدة </h2>
      {/* <p className="p1p">لا داعي للقلق,فما عليك سوى ارسال بريدك الالكتروني لإعادة تعين كلمة مرو تعين كلمة مرورك </p> */}
      <div className="shadows">
        <h2 className="logo">Logo</h2>
        <p className="p-reseat">إضافة كلمة سر جديدة </p>
        <p className="p-sendemail">ادخل كلمة السر الجدية الخاصة بك</p>
        <form>
          <label className="email-form" htmlFor="email">
            كلمة السر
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="johan.deo@gmail.com"
          />
          {error && <p className="error">{error}</p>}
          {isSent && (
            <p className="success">Password reset email sent successfully!</p>
          )}
          <div className="d"></div>
          <button className="login-btn11" onClick={handleResetPassword}>
            ارسال كلمة السر الجديدة{" "}
          </button>
          {/* <Link className="link" to="/twostep">العودة لواجهة تسجيل الدخول</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
