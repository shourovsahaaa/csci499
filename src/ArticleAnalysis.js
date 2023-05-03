import React, { useState } from "react";
import "./ArticleAnalysis.css";

export default function ArticleAnalysis() {
  const [prompt, setPrompt] = useState("");
  const [article, setArticle] = useState("");
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleArticleChange = (event) => {
    setArticle(event.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "93.299vh",
        fontfamily: "Encode Sans Semi Condensed, sans-serif",
        margin: 0,
        position: "absolute",
      }}
    >
      <div className="center" style={{ position: "absolute", left: "15%" }}>
        <h1 style={{ fontSize: "40px" }}>Article Analyzer</h1>
        <text
          style={{
            width: "20vw",
            height: "60vh",
            fontFamily: "'Encode Sans Semi Condensed', sans-serif",
            fontSize: "36px",
            fontWeight: 500,
            color: "#000000",
            position: "absolute",
            top: "95%",
            left: "-45.7%",
            textAlign: "end",
          }}
        >
          Article
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
            fontSize: "36px",
            fontWeight: 500,
            color: "#000000",
            position: "absolute",
            top: "95%",
            left: "118%",
          }}
        >
          <textarea
            type="text"
            name="article"
            value={article}
            onChange={handleArticleChange}
            placeholder="Paste article body here..."
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "420px",
              height: "288px",
              position: "absolute",
              top: "1%",
              left: "0%",
            }}
            required
          />

          <textarea
            type="text"
            name="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Insert prompt..."
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#737373",
              width: "420px",
              height: "72px",
              position: "absolute",
              top: "55.2%",
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
              top: "78.7%",
              left: "0%",
            }}
          >
            <option value="summary">Generate summary...</option>
            <option value="veracity">Accuracy</option>
            <option value="credibility">Credibility</option>
            <option value="Relevance">Relevance</option>
          </select>
          <button
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              backgroundColor: "#0FFF50",
              fontSize: "24px",
              fontWeight: "500",
              width: "212.5px",
              height: "52px",
              position: "absolute",
              top: "90%",
              left: "25%",
              fontSmooth: "auto",
            }}
          >
            Analyze
          </button>
        </form>
      </div>
    </div>
  );
}
