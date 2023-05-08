import React, { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFocus = (event) => {
    event.target.placeholder = "";
  };

  const handleBlur = (event) => {
    if (event.target.name === "username") {
      event.target.placeholder = "Username or Email Address";
    } else if (event.target.name === "password") {
      event.target.placeholder = "Password";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    fetch(`http://localhost:8000/api/usercreds/postcheckcreds/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submittedUsername: username,
        submittedPassword: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["value"] === 0) {
          window.location.pathname = "/home";
          setFavoritePlayers(data["favoritePlayers"]);
        } else {
          setMessage(data["message"]);
        }
        console.log("data", data);
      })
      .catch((error) => console.error(error));
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
          <h1> Sign In </h1>
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
                  placeholder="Username or Email Address"
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
                }}
              />
            </form>
            <h5
              style={{
                color: "red",
                fontWeight: 500,
                position: "absolute",
                top: "60%",
              }}
            >
              {message}
            </h5>
          </div>
          <button
            type="submit"
            className="signInBtn"
            style={{ position: "absolute", top: "140%" }}
          >
            Login
          </button>
        </form>
        <div className="register" style={{ position: "absolute", top: "195%" }}>
          <a
            href="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create new account!
          </a>
        </div>
      </div>
    </div>
  );
}
