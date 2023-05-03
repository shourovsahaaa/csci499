import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordVerifyChange = (event) => {
    setPasswordVerify(event.target.value);
    //if (password !== passwordVerify) {
    //  setMessage("Passwords do not match. Try again.");
    //} else {
    //  setMessage("");
    //}
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFocus = (event) => {
    event.target.placeholder = "";
  };

  const handleBlur = (event) => {
    if (event.target.name === "username") {
      event.target.placeholder = "Username";
    } else if (event.target.name === "email") {
      event.target.placeholder = "E-mail Address";
    } else if (event.target.name === "password") {
      event.target.placeholder = "Password";
    } else if (event.target.name === "passwordVerify") {
      event.target.placeholder = "Confirm Password";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    if (password !== passwordVerify) {
      setMessage("Passwords do not match. Try again.");
    } else {
      console.log("Password:", password);
      window.location.pathname = "/signin";
    }
  };

  return (
    <div className="body">
      <div
        className="center"
        style={{
          position: "absolute",
          top: "200%",
          left: "37%",
        }}
      >
        <div className="signIn">
          <h1> Register </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="usernameContainer">
            <form onSubmit={handleSubmit}>
              <div className="label">
                <input
                  type="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Username"
                  style={{
                    fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#737373",
                    width: "420px",
                    height: "36px",
                    position: "relative",
                  }}
                />
              </div>
            </form>
          </div>
          <div className="emailContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="E-mail Address"
                style={{
                  fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373",
                  width: "420px",
                  height: "36px",
                  position: "relative",
                  top: "3px",
                }}
              />
            </form>
          </div>
          <div className="passwordContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Password"
                style={{
                  fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373",
                  width: "420px",
                  height: "36px",
                  position: "relative",
                  top: "-4px",
                }}
              />
            </form>
          </div>
          <div className="passwordVerifyContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="passwordVerify"
                value={passwordVerify}
                onChange={handlePasswordVerifyChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Confirm Password"
                style={{
                  fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373",
                  width: "420px",
                  height: "36px",
                  position: "relative",
                  top: "21px",
                }}
              />
            </form>
            <h5 style={{ color: "red", fontWeight: 500 }}>{message}</h5>
          </div>
          <button type="submit" className="signInBtn">
            <a
              href="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Register
            </a>
          </button>
        </form>
      </div>
    </div>
  );
}
