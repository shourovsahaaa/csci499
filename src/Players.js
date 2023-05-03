//hopeyfuucks

import React from "react";
export default function Players() {
  return (
    <div
      style={{
        backgroundColor: "black",
        backgroundSize: "cover",
        width: "17vw",
        height: "93vh",
        margin: "0px",
      }}
    >
      <div
        style={{
          color: "white",
          margin: "0px",
          fontWeight: 500,
          fontSize: 26,
          position: "absolute",
          top: "12vh",
          left: "5vh",
        }}
      >
        Favorite Players
      </div>
      <div
        style={{
          color: "white",
          margin: "0px",
          lineHeight: 3,
          fontWeight: 500,
          fontSize: 16,
          position: "absolute",
          top: "19vh",
          left: "5vh",
        }}
      >
        Cristiano Ronaldo<br></br>Kylian Mbappe<br></br>Lionel Messi <br></br>Neymar <br></br>
        <br></br>+ Add
      </div>
      <div
        style={{
          color: "white",
          margin: "0px",
          fontWeight: 500,
          fontSize: 26,
          position: "absolute",
          top: "12vh",
          left: "21.5vw",
        }}
      >
        Stats
      </div>
    </div>
  );
}
