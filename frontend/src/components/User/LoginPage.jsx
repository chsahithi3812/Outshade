import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./login.css"
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          password: password,
        }),
      }).then((res) => {
        res.json().then((result) => {
          console.log(result);
        });
      });
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" action="/">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          name="first_name"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          name="password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Link to="/forgetpassword">
          <label className="right">Forget password?</label>
        </Link>
        <button className="loginButton" onClick={submitHandler}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
}