import React, { useState, useEffect } from "react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const Base = [
    "name",
    "nation",
    "position",
    "squad",
    "comp",
    "age",
    "matchesplayed",
    "minutesplayed",
    "minutespermatch",
  ];

  const Goals = [
    "goals",
    "shots",
    "sot",
    "sotperc",
    "goalspersh",
    "goalspersot",
  ];

  const Passes = [
    "passes",
    "PasTotCmp",
    "PasTotAtt",
    "PasTotCmpperc",
    "PasTotDist",
    "PasTotPrgDist",
  ];

  const GCA = [
    "SCA",
    "ScaPassLive",
    "ScaPassDead",
    "ScaDrib",
    "ScaSh",
    "ScaFld",
    "ScaDef",
  ];

  const Tackles = [
    "Tkl",
    "TklWon",
    "TklDef3rd",
    "TklMid3rd",
    "TklAtt3rd",
    "TklDri",
    "TklDriAtt",
  ];

  const Presses = [
    "Press",
    "PresSucc",
    "Pressperc",
    "PresDef3rd",
    "PresMid3rd",
    "PresAtt3rd",
  ];

  const Blocks = ["Blocks", "BlkSh", "BlkShSv", "BlkPass"];

  const Interceptions = ["Int", "TklplusInt"];

  const Touches = [
    "Touches",
    "TouDefPen",
    "TouDef3rd",
    "TouMid3rd",
    "TouAtt3rd",
    "TouAttPen",
  ];

  const Dribbles = ["DriSucc", "DriAtt", "DriSuccperc", "DriPast", "DriMegs"];

  const Carries = ["Carries", "CarTotDist", "CarPrgDist", "CarProg", "Car3rd"];

  const Receives = ["RecTarg", "Rec", "Recperc", "RecProg"];

  const Infractions = ["CrdY", "CrdR", "twoCrdY", "Fls", "Fld", "Off"];

  const Aerial = [
    "Crs",
    "TklW",
    "PKwon",
    "PKcon",
    "OG",
    "Recov",
    "AerWon",
    "AerLost",
    "AerWonperc",
  ];

  const currUsername = localStorage.getItem("currUsername");
  fetch(`http://localhost:8000/api/usercreds/postupdatefavoriteplayers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: currUsername,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("currFavoritePlayers", data["favoritePlayers"]);

      console.log("data", data);
    })
    .catch((error) => console.error(error));

  const favoritePlayersString = localStorage.getItem("currFavoritePlayers");
  const favoritePlayers = favoritePlayersString
    ? favoritePlayersString.split(",")
    : [];

  useEffect(() => {
    // Update the selected players state
    setSelectedPlayers([...selectedPlayers, ...favoritePlayers]);
  }, []);

  useEffect(() => {
    handleSubmit(); // Fetch player stats when selectedPlayers change
  }, [selectedPlayers]);

  useEffect(() => {
    fetch("http://localhost:8000/api/players/")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.names);
        console.log("data", data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSelectPlayer = (event) => {
    const selectedPlayer = event.target.value;
    const selectedPlayerString = event.target.value.toString();
    fetch("http://localhost:8000/api/usercreds/postaddfavoriteplayers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currUsername,
        playerName: selectedPlayerString,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    setSelectedPlayers([...selectedPlayers, selectedPlayer]);
  };

  const handleRemovePlayer = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    setPlayerStats(playerStats.filter((p) => p.name !== player));
    const playerString = player.toString();
    fetch("http://localhost:8000/api/usercreds/postremovefavoriteplayers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currUsername,
        playerName: playerString,
      }),
    });
  };

  const handleSubmit = () => {
    Promise.all(
      selectedPlayers.map(
        (player) =>
          fetch(`http://localhost:8000/api/player/${player}/stats/`)
            .then((res) => res.json())
            .then((data) => ({ name: player, ...data })) // Include player name in the stats data
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
      <div
        style={{
          color: "lightblue",
          margin: "0px",
          fontWeight: 500,
          fontSize: 18,
          position: "absolute",
          top: "12.7vh",
          left: "23vw",
          cursor: "pointer",
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Add+
      </div>
      {isDropdownOpen && (
        <div
          style={{
            position: "relative",
            top: "12.7vh",
            left: "25.5vw",
            backgroundColor: "transparent",
            borderRadius: "0px",
            padding: "0px",
            fontFamily: "'Encode Sans Semi Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          <select
            value=""
            onChange={(event) => {
              const value = event.target.value;
              if (selectedOptions.includes(value)) {
                setSelectedOptions(
                  selectedOptions.filter((option) => option !== value)
                );
              } else {
                setSelectedOptions([...selectedOptions, value]);
              }
            }}
            style={{
              fontFamily: "'Encode Sans Semi Condensed', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              backgroundColor: "transparent",
            }}
          >
            <option
              value=""
              disabled
              hidden
              style={{
                color: "black",
              }}
            >
              Select Category...
            </option>

            <option
              value="Base"
              style={{
                color: selectedOptions.includes("Base") ? "red" : "black",
                fontWeight: selectedOptions.includes("Base")
                  ? "bold"
                  : "normal",
              }}
            >
              Base
            </option>
            <option
              value="Goals"
              style={{
                color: selectedOptions.includes("Goals") ? "red" : "black",
                fontWeight: selectedOptions.includes("Goals")
                  ? "bold"
                  : "normal",
              }}
            >
              Goals
            </option>
            <option
              value="Passes"
              style={{
                color: selectedOptions.includes("Passes") ? "red" : "black",
                fontWeight: selectedOptions.includes("Passes")
                  ? "bold"
                  : "normal",
              }}
            >
              Passes
            </option>
            <option
              value="GCA"
              style={{
                color: selectedOptions.includes("GCA") ? "red" : "black",
                fontWeight: selectedOptions.includes("GCA") ? "bold" : "normal",
              }}
            >
              GCA
            </option>
            <option
              value="Tackles"
              style={{
                color: selectedOptions.includes("Tackles") ? "red" : "black",
                fontWeight: selectedOptions.includes("Tackles")
                  ? "bold"
                  : "normal",
              }}
            >
              Tackles
            </option>
            <option
              value="Presses"
              style={{
                color: selectedOptions.includes("Presses") ? "red" : "black",
                fontWeight: selectedOptions.includes("Presses")
                  ? "bold"
                  : "normal",
              }}
            >
              Presses
            </option>
            <option
              value="Blocks"
              style={{
                color: selectedOptions.includes("Blocks") ? "red" : "black",
                fontWeight: selectedOptions.includes("Blocks")
                  ? "bold"
                  : "normal",
              }}
            >
              Blocks
            </option>
            <option
              value="Interceptions"
              style={{
                color: selectedOptions.includes("Interceptions")
                  ? "red"
                  : "black",
                fontWeight: selectedOptions.includes("Interceptions")
                  ? "bold"
                  : "normal",
              }}
            >
              Interceptions
            </option>
            <option
              value="Touches"
              style={{
                color: selectedOptions.includes("Touches") ? "red" : "black",
                fontWeight: selectedOptions.includes("Touches")
                  ? "bold"
                  : "normal",
              }}
            >
              Touches
            </option>
            <option
              value="Dribbles"
              style={{
                color: selectedOptions.includes("Dribbles") ? "red" : "black",
                fontWeight: selectedOptions.includes("Dribbles")
                  ? "bold"
                  : "normal",
              }}
            >
              Dribbles
            </option>
            <option
              value="Carries"
              style={{
                color: selectedOptions.includes("Carries") ? "red" : "black",
                fontWeight: selectedOptions.includes("Carries")
                  ? "bold"
                  : "normal",
              }}
            >
              Carries
            </option>
            <option
              value="Receives"
              style={{
                color: selectedOptions.includes("Receives") ? "red" : "black",
                fontWeight: selectedOptions.includes("Receives")
                  ? "bold"
                  : "normal",
              }}
            >
              Receives
            </option>
            <option
              value="Infractions"
              style={{
                color: selectedOptions.includes("Infractions")
                  ? "red"
                  : "black",
                fontWeight: selectedOptions.includes("Infractions")
                  ? "bold"
                  : "normal",
              }}
            >
              Infractions
            </option>
            <option
              value="Aerial"
              style={{
                color: selectedOptions.includes("Aerial") ? "red" : "black",
                fontWeight: selectedOptions.includes("Aerial")
                  ? "bold"
                  : "normal",
              }}
            >
              Aerial
            </option>
          </select>
        </div>
      )}
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
              {selectedOptions.includes("Base") && (
                <>
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
                </>
              )}
              {selectedOptions.includes("Goals") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    goals
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    shots
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    sot
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    sotperc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    goalspersh
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    goalspersot
                  </th>
                </>
              )}
              {selectedOptions.includes("Passes") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Passes
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PassTotCmp
                  </th>

                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PastoCmpperc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PasToTDist
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PasTotPrgDist
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PasShoCmpperc
                  </th>
                </>
              )}
              {selectedOptions.includes("GCA") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    SCA
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    SCAPASSLIVE
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    SCADRIB
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    SCASH
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    SCAFLD
                  </th>
                </>
              )}

              {selectedOptions.includes("Tackles") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Tkl
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TklWon
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TklDef3rd
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TklMid3rd
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TklAtt3rd
                  </th>
                </>
              )}
              {selectedOptions.includes("Presses") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Press
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PresSucc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Pressperc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PresDef3rd
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    PresMid3rd
                  </th>
                </>
              )}

              {selectedOptions.includes("Blocks") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Blocks
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    BlkSh
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    BlkShSv
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    BlkPass
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    BlkPerc
                  </th>
                </>
              )}
              {selectedOptions.includes("Interceptions") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Int
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Int + Tkl
                  </th>
                </>
              )}
              {selectedOptions.includes("Touches") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Touches
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TouDefPen
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TouDef3rd
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    TouMid3rd
                  </th>
                </>
              )}
              {selectedOptions.includes("Dribbles") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    DriSucc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    DriAtt
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    DriSuccperc
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    DriPast
                  </th>
                </>
              )}

              {selectedOptions.includes("Carries") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Carries
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    CarTotDist
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    CarPrgDist
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    CarProg
                  </th>
                </>
              )}
              {selectedOptions.includes("Receives") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    RecTarg
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Rec
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    RecProg
                  </th>
                </>
              )}
              {selectedOptions.includes("Infractions") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    CrdY
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    CrdR
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    twoCrdY
                  </th>
                </>
              )}
              {selectedOptions.includes("Aerial") && (
                <>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    AerWon
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    AerWon
                  </th>
                  <th
                    style={{
                      padding: "4px",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    Recovered
                  </th>
                </>
              )}
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
                {selectedOptions.includes("Base") && (
                  <>
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
                  </>
                )}
                {selectedOptions.includes("Goals") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.goals}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.shots}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.position}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.sot}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.sotperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.goalspersot}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Passes") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasLonCmpperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasTotCmp}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasTotAtt}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasTotCmpperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasTotPrgDist}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PasTotCmpperc}
                    </td>
                  </>
                )}
                {selectedOptions.includes("GCA") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.SCA}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.ScaPassLive}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.ScaPassDead}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.ScaDrib}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.ScaSh}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.ScaFld}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Tackles") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Tkl}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TklWon}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TklDef3rd}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TklMid3rd}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TklAtt3rd}
                    </td>
                  </>
                )}

                {selectedOptions.includes("Presses") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Press}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PresSucc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Pressperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PresDef3rd}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.PresMid3rd}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Blocks") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Blocks}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.BlkSh}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Pressperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.BlkShSv}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.BlkPass}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Interceptions") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Int}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TklplusInt}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Touches") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Touches}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TouDefPen}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TouDef3rd}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.TouMid3rd}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Dribbles") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.DriSucc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.DriAtt}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.DriSuccperc}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.DriPast}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Carries") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Carries}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.CarTotDist}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.CarPrgDist}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.CarProg}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Receives") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.RecTarg}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Rec}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Recperc}
                    </td>
                  </>
                )}

                {selectedOptions.includes("Infractions") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.CrdY}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.CrdR}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.twoCrdY}
                    </td>
                  </>
                )}
                {selectedOptions.includes("Aerial") && (
                  <>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.AerWon}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.AerLost}
                    </td>
                    <td style={{ padding: "4px", borderRadius: "10px" }}>
                      {player.Recov}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
