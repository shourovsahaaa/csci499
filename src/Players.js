import React, { useState, useEffect } from "react";
import favoritePlayers from "./LoginForm.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  const [isPressed, setIsPressed] = useState(false);
  const handleAddClick = () => {
    setIsPressed(true);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/players/")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data["names"]);
        console.log("data", data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [selectedPlayers]);

  const handleSelectPlayer = (event) => {
    const selectedPlayer = event.target.value;
    setSelectedPlayers([...selectedPlayers, selectedPlayer], handleSubmit);
  };

  const handleRemovePlayer = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    setPlayerStats(playerStats.filter((p) => p.name !== player));
  };

  const handleSubmit = (event) => {
    Promise.all(
      selectedPlayers.map((player) =>
        fetch(`http://localhost:8000/api/player/${player}/stats/`).then((res) =>
          res.json()
        )
      )
    )
      .then((data) => {
        setPlayerStats(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        backgroundSize: "cover",
        width: "17vw",
        height: "100vh",
        margin: "0px",
        zIndex: "-1",
        position: "absolute",
        top: "0px",
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
          top: "25vh",
          left: "5vh",
        }}
      >
        {selectedPlayers.map((player) => (
          <div key={player}>
            <span>{player}</span>
            <text>ㅤ</text>
            <button
              type="button"
              onClick={() => handleRemovePlayer(player)}
              style={{
                color: "white",
                backgroundColor: "black",
                fontFamily: "'Encode Sans Semi Condensed', sans-serif",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <form
        style={{
          color: "white",
          margin: "0px",
          fontWeight: 500,
          fontSize: 16,
          position: "absolute",
          top: "19vh",
          left: "5vh",
        }}
      >
        <label
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "0px",
            fontFamily: "'Encode Sans Semi Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          <select
            value=""
            onChange={(event) => {
              handleSelectPlayer(event);
              handleSubmit(event); // add handleSubmit as a callback
            }}
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            <option disabled value="">
              + Add Player
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
        </label>
        <br />
        <br />
      </form>
      <div
        style={{
          color: "white",
          margin: "0px",
          fontWeight: 500,
          fontSize: 26,
          position: "absolute",
          top: "12vh",
          left: "19vw",
        }}
      >
        Stats
      </div>
      {playerStats.length > 0 && (
        <table
          style={{
            color: "white",
            margin: "0px",
            fontWeight: 500,
            fontSize: 26,
            position: "absolute",
            top: "16vh",
            left: "19vw",
            backgroundColor: "black",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "linear-gradient(to bottom, #232323, #333333)",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Nation
              </th>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Position
              </th>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Squad
              </th>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Age
              </th>
              <th
                style={{
                  padding: "4px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Starts
              </th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((player, index) => (
              <tr
                key={index}
                style={{
                  background: index % 2 === 0 ? "#232323" : "#333333",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.name}
                </td>
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.nation}
                </td>
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.position}
                </td>
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.squad}
                </td>
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.age}
                </td>
                <td style={{ padding: "4px", borderRadius: "10px" }}>
                  {player.starts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
