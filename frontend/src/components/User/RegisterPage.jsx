import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css"
export default function SignUpPage() {
  const [cpassword,setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          password: password,
          cpassword: cpassword
        }),
      }).then(res=>{
        res.json().then(result =>{
          console.log(result)
        })
      })
    } catch (err) {
      console.log(err);
    }
   
  
  
    setEmail("");
    setPassword("");
    setCpassword("");
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
       <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Confirm your password..."
          onChange={(e) => setCpassword(e.target.value)}
        />
        <button className="registerButton" type="submit" >Register</button>
      </form>
        <button className="registerLoginButton">
        <Link className="link" to="/">
                LOGIN
              </Link>
        </button>

    </div>
  );
}
