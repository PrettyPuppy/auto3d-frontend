import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const handleMailChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        localStorage.setItem("token", data.tokens);
        localStorage.setItem("username", data.user.user);
        localStorage.setItem("role", data.user.role);
        setLoggedIn(true);

        window.location.href = "/task";
      } else {
        alert("Incorrect username and/or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">

        <div className="input-wrapper">
        <input type="text" style={{paddingLeft: '20px'}} placeholder="UserName" onChange={handleMailChange} />
        <input type="password" style={{paddingLeft: '20px'}} placeholder="Password" onChange={handlePasswordChange} />
        </div>
        <div className="button-wrapper">
        <button onClick={handleSubmit}>Login</button>
        <p>Don't you have an account? <Link to="/register">Register</Link></p>
        </div>

    </div>
  );
};

export default Login;
