import React, { useState, useEffect } from "react";
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
          left: "21.5vw",
        }}
      >
        Stats
      </div>
      {playerStats.length > 0 && (
        <div
          style={{
            color: "white",
            margin: "0px",
            fontWeight: 500,
            fontSize: 26,
            position: "absolute",
            top: "16vh",
            left: "21.5vw",
          }}
        >
          {playerStats.map((player) => (
            <div key={player.name}>
              <h2>{player.name}</h2>
              <p>Nation: {player.nation}</p>
              <p>Position: {player.position}</p>
              <p>Squad: {player.squad}</p>
              <p>Age: {player.age}</p>
              <p>Starts: {player.starts}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
