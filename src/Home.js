import React from "react";

export default function Home() {
  return (
    <div>
      <nav>{/* Your navigation bar content */}</nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "white",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Unleash the full potential of{" "}
          <span style={{ color: "rgb(15, 255, 80)", fontSize: "36px" }}>
            Data
          </span>{" "}
          and <span style={{ color: "red", fontSize: "36px" }}>AI</span> to
          revolutionize soccer information!
        </h1>
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "white",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          Our mission is to provide users with comprehensive access to upcoming
          league games and up-to-date player stats, while fostering the
          exploration of ideas, theories, and opinions in the realm of soccer.
          Whether it's your concept or someone else's, our Article Analysis page
          allows you to test and analyze ideas using real-time data.
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "white",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          Stay informed and updated on the top leagues, players, and upcoming
          matches through our League Breakdown page. Dive into the Players page
          to explore a vast collection of statistics on your favorite players.
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "white",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          Have burning soccer-related questions or ideas? Utilize our Article
          Analysis page to leverage AI-powered data analysis. Say goodbye to
          wasting time on poorly-researched articles lacking real statistical
          evidence. With our platform, you can analyze articles with data, or
          even combine both approaches for a more comprehensive understanding.
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "white",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          Never be uninformed about soccer again!
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          About Us:
          <br></br>
        </p>
        {/* About Us section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "28px", color: "lightblue" }}>
              Shourov Saha
            </div>
            <div style={{ fontSize: "18px", color: "lightgrey" }}>
              shourov.saha85@myhunter.cuny.edu
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            <div style={{ fontSize: "28px", color: "lightblue" }}>
              Obinna Chukwu
            </div>
            <div style={{ fontSize: "18px", color: "lightgrey" }}>
              obiuzchuk@gmail.com
            </div>
          </div>
        </div>

        {/* For the best experience section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
            fontSize: "18px",
            color: "grey",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          <br></br> <br></br> <br></br> <br></br>
          For the best experience, we recommend being signed in.
        </div>

        {/* Rest of your home page content */}
      </div>
    </div>
  );
}
