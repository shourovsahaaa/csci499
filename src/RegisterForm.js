import React, { useState, useEffect } from "react";
import "./LoginForm.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [message, setMessage] = useState("");

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/usercreds/usernames/")
      .then((response) => response.json())
      .then((data) => {
        setUsernames(data["usernames"]);
        console.log("data", data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordVerifyChange = (event) => {
    setPasswordVerify(event.target.value);
  };

  const handleFocus = (event) => {
    event.target.placeholder = "";
  };

  const handleBlur = (event) => {
    if (event.target.name === "username") {
      event.target.placeholder = "Username";
    } else if (event.target.name === "password") {
      event.target.placeholder = "Password";
    } else if (event.target.name === "passwordVerify") {
      event.target.placeholder = "Confirm Password";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordVerify) {
      setMessage("Passwords do not match. Try again.");
    } else {
      if (usernames.includes(username)) {
        setMessage("Username already in use. Please try again.");
      } else {
        fetch("http://localhost:8000/api/usercreds/postusercreds/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            window.location.pathname = "/signin";
          })
          .catch((error) => console.error(error));
      }
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
          <button
            type="submit"
            className="signInBtn"
            style={{
              textDecoration: "none",
              color: "inherit",
              position: "absolute",
              top: "110%",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
