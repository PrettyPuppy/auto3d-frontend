import React, { useState, useNavigate } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [selectedOption, setSelectedOption] = useState("client"); // Default selection

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
  };
  const handleMailChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirm) {
      alert("Password doesn't match!");
    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: 'user',
            email : username,
            password : password,
            role: selectedOption,
          }),
        });
        if (res.ok) {
          window.location.href = "/login";
        } else if (res.status === 400 || !res) {
          window.alert("Already Used Details");
        } else {
          window.alert("Register Failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register-wrapper">
        <div className="input-wrapper">
        <input type="text" style={{paddingLeft: '20px'}} placeholder="UserName" onChange={handleMailChange} />
        <input type="password" style={{paddingLeft: '20px'}} placeholder="Password" onChange={handlePasswordChange} />
        <input type="password" style={{paddingLeft: '20px'}} placeholder="Confirm Password" onChange={handleConfirmChange} />
        </div>
        <div className="button-wrapper">
        <button onClick={handleSubmit}>Register</button>
        <p>Do you have an account? &nbsp;&nbsp;&nbsp; <Link to="/login">Login</Link></p>
        </div>
    </div>
  );
}
