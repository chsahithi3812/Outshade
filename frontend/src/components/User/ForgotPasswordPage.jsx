import React from "react";
import { Link } from "react-router-dom";

import "./frgtpw.css"
export default function ForgetPasswordPage() {
    
  return (
    <div className="login">
    <span className="loginTitle">Reset Your Password</span>
    <h4>Enter Your Email Address and we will send you a new Password</h4>
    <form className="loginForm">
      <label>Email</label>
      <input className="loginInput" type="text" placeholder="Enter your email..." />
      
      <button className="loginButton">Send Password</button>
    </form>
      <button className="loginRegisterButton">
      <Link className="link" to="/register" >
                REGISTER
              </Link>
      </button>
  </div>
  );
}
