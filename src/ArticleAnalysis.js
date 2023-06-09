import React, { useState, useEffect } from "react";
import "./ArticleAnalysis.css";

export default function ArticleAnalysis() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [opinion, setOpinion] = useState("");
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");
  const [aspect, setAspect] = useState("");
  const [generatingMessage, setGeneratingMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/players/")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data["names"]);
        console.log("data", data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const requestBody = {
      name: name,
      text: text,
      opinion: opinion,
      aspect: aspect,
    };

    const interval = setInterval(() => {
      setGeneratingMessage((prevMessage) => {
        switch (prevMessage) {
          case "":
            return "Generating.";
          case "Generating.":
            return "Generating..";
          case "Generating..":
            return "Generating...";
          case "Generating...":
            return "Generating.";
          default:
            return "";
        }
      });
    }, 1000);

    fetch("http://localhost:8000/api/soccerbanter/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        clearInterval(interval);
        setGeneratingMessage("");
      })
      .catch((error) => {
        console.error(error);
        clearInterval(interval);
      });
  }

  return (
    <div
      className="AAbody"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        zIndex: "-1",
        fontFamily: "Encode Sans Semi Condensed, sans-serif",
        margin: 0,
        position: "absolute",
        top: "0px",
      }}
    >
      <div
        className="center"
        style={{ position: "absolute", left: "15%", top: "7%" }}
      >
        <h1 style={{ fontSize: "40px", color: "#FFFFFF", fontWeight: "500" }}>
          Article Analyzer
        </h1>
        <text
          style={{
            width: "20vw",
            height: "60vh",
            fontFamily: "'Encode Sans Semi Condensed', sans-serif",
            fontSize: "32px",
            fontWeight: "500",
            color: "#FFFFFF",
            position: "absolute",
            top: "99%",
            left: "-75.7%",
            textAlign: "end",
          }}
        >
          Player
          <br />
          <br />
          Article
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          Prompt
          <br />
          <br />
          <br />
          Specific Aspect
        </text>
        <form
          style={{
            width: "425px",
            height: "60vh",
            fontFamily: "'Encode Sans Semi Condensed', sans-serif",
            fontSize: "32px",
            fontWeight: 500,
            color: "#FFFFFF",
            position: "absolute",
            top: "95%",
            left: "85%",
          }}
        >
          <select
            value=""
            onChange={(event) => setName(event.target.value)}
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "425px",
              height: "32px",
              position: "absolute",
              top: "2%",
              left: "0%",
            }}
          >
            <option disabled value="">
              {name}
            </option>
            {players.map((player) => (
              <option
                key={player.id}
                value={player}
                style={{
                  fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {player}
              </option>
            ))}
          </select>
          <textarea
            type="text"
            name="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste article body here..."
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "420px",
              height: "288px",
              position: "absolute",
              top: "16%",
              left: "0%",
            }}
            required
          />
          <textarea
            type="text"
            name="opinion"
            value={opinion}
            onChange={(event) => setOpinion(event.target.value)}
            placeholder="Insert prompt..."
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "420px",
              height: "72px",
              position: "absolute",
              top: "72%",
              left: "0%",
            }}
          ></textarea>
          <select
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "425px",
              height: "32px",
              position: "absolute",
              top: "94%",
              left: "0%",
            }}
            required
            onChange={(event) => setAspect(event.target.value)}
          >
            <option disabled value="">
              Select an option...
            </option>
            <option value="Summary">Generate summary...</option>
            <option value="Veracity">Veracity</option>
            <option value="Tone">Tone/Bias</option>
          </select>
          <button
            onClick={handleSubmit}
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              backgroundColor: "#0FFF50",
              fontSize: "24px",
              fontWeight: "500",
              width: "212.5px",
              height: "52px",
              position: "absolute",
              top: "110%",
              left: "25%",
              fontSmooth: "auto",
            }}
          >
            Analyze
          </button>
        </form>
        <div>
          <text
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              color: "#FFFFFF",
              position: "absolute",
              top: "95%",
              left: "275%",
            }}
          >
            Result
          </text>

          <div
            style={{
              position: "absolute",
              top: "655%",
              left: "277%",
              color: "red",
              fontSize: "24px",
            }}
          >
            {generatingMessage}
          </div>

          <textarea
            readOnly
            value={result}
            style={{
              width: "25vw",
              height: "56.16vh",
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              color: "#000000",
              position: "absolute",
              top: "140%",
              left: "275%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
