import React from "react";
import "./LeagueBreakdown.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LeagueBreakdown() {
  const [leagues, setLeagues] = useState([]);
  const [favoritedLeague, setFavoritedLeague] = useState("");
  const [favoriteschedule, setFavoriteSchedule] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/football-leagues")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setLeagues(response.data["leagues"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const extractTeamNames = (game) => {
    const startBracketIndex = game.lastIndexOf("[winner: ");
    if (startBracketIndex !== -1) {
      const vsIndex = game.indexOf("vs");
      const team1 = game.substring(0, vsIndex).trim();
      const team2 = game.substring(vsIndex + 2, startBracketIndex).trim();
      const winner = game
        .substring(startBracketIndex + 9, game.length - 2)
        .trim();
      return { team1, team2, winner };
    } else if (game.includes("[DRAW]")) {
      const vsIndex = game.indexOf("vs");
      const team1 = game.substring(0, vsIndex).trim();
      const team2 = game.substring(vsIndex + 2, game.indexOf("[DRAW]")).trim();
      return { team1, team2, winner: "DRAW" };
    }
    return { team1: game, team2: "", winner: "" };
  };

  const parseTopScorer = (topScorer) => {
    const playerName = topScorer.substring(0, topScorer.indexOf("[")).trim();
    const teamName = topScorer
      .substring(topScorer.indexOf("[") + 1, topScorer.indexOf("]"))
      .trim();
    const stats = topScorer.substring(topScorer.indexOf("]") + 1).trim();

    let goals = "";
    let assists = "";
    let penalties = "";

    const goalsMatch = stats.match(/(\d+)G/);
    if (goalsMatch) {
      goals = goalsMatch[1];
    }

    const assistsMatch = stats.match(/(\d+)A/);
    if (assistsMatch) {
      assists = assistsMatch[1];
    } else {
      assists = "0";
    }

    const penaltiesMatch = stats.match(/(\w+)P/);
    if (penaltiesMatch && penaltiesMatch[1] !== "None") {
      penalties = penaltiesMatch[1];
    } else {
      penalties = "0";
    }

    return { playerName, teamName, goals, assists, penalties };
  };

  const parseTopTeam = (topTeam) => {
    const teamName = topTeam.substring(0, topTeam.lastIndexOf(" ")).trim();
    const record = topTeam.substring(topTeam.lastIndexOf(" ") + 1).trim();

    const winsMatch = record.match(/(\d+)W/);
    const wins = winsMatch ? winsMatch[1] : 0;

    const lossesMatch = record.match(/(\d+)L/);
    const losses = lossesMatch ? lossesMatch[1] : 0;

    const drawsMatch = record.match(/(\d+)D/);
    const draws = drawsMatch ? drawsMatch[1] : 0;

    return { teamName, wins, losses, draws };
  };

  const getTeamColor = (team, winner) => {
    if (team === winner) {
      return "rgb(15, 255, 80)"; // Green color for the winning team
    } else if (team && winner !== "DRAW") {
      return "red"; // Red color for the losing team
    }
    return "orange"; // White color for draws and empty values
  };

  const handleTableClick = (leagueName, next_three_games) => {
    setFavoritedLeague(leagueName);
    setFavoriteSchedule(next_three_games);
  };

  const parseSchedule = (schedule) => {
    const regex = /(.+?) vs (.+?) at (.+)/;
    const match = schedule.match(regex);
    if (match) {
      const team1 = match[1].trim();
      const team2 = match[2].trim();
      const dateTime = new Date(match[3]);
      const dayOfWeek = dateTime.toLocaleString("en-US", { weekday: "short" });
      const month = dateTime.toLocaleString("en-US", { month: "short" });
      const date = dateTime.getDate();
      const time = dateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      return (
        <span>
          <span style={{ color: "red" }}>{team1}</span>
          <span style={{ fontSize: 17 }}> vs </span>
          <span style={{ color: "red" }}>{team2}</span>
          <span style={{ fontSize: 17 }}> on</span>
          <span style={{ fontSize: 20 }}>
            {" "}
            {dayOfWeek}, {month} {date}{" "}
          </span>
          <span style={{ fontSize: 17 }}>at</span>
          <span style={{ fontSize: 20 }}> {time}</span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="container" style={{ top: "0", left: "0" }}>
      <div className="column" style={{ top: "100px" }}>
        {leagues.slice(0, 3).map((league) => (
          <table
            key={league.id}
            onClick={() =>
              handleTableClick(league.name, league.next_three_games)
            }
          >
            <caption
              style={{ fontSize: 18 }}
              onClick={() =>
                handleTableClick(league.name, league.next_three_games)
              }
            >
              {league.name}
            </caption>
            <thead>
              <tr>
                <th>Top Scorer</th>
                <th>Top Team</th>
                <th>Last Three Games</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {league.top_scorer && (
                      <>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: "white",
                          }}
                        >
                          {parseTopScorer(league.top_scorer).playerName}
                        </span>
                        <br />
                        <span
                          style={{ fontSize: 12, textTransform: "capitalize" }}
                        >
                          {parseTopScorer(league.top_scorer).teamName}
                        </span>
                        <br />
                        <span style={{ fontSize: 12 }}>
                          {parseTopScorer(league.top_scorer).goals} Goals,{" "}
                          {parseTopScorer(league.top_scorer).assists} Assists,{" "}
                          {parseTopScorer(league.top_scorer).penalties}{" "}
                          Penalties
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: 18 }}>
                    {parseTopTeam(league.top_team).teamName}
                  </div>
                  <div style={{ fontSize: 14, color: "rgb(15, 255, 80)" }}>
                    {parseTopTeam(league.top_team).wins} Wins
                  </div>
                  <div style={{ fontSize: 14, color: "red" }}>
                    {parseTopTeam(league.top_team).losses} Losses
                  </div>
                  <div style={{ fontSize: 14, color: "orange" }}>
                    {parseTopTeam(league.top_team).draws} Draws
                  </div>
                </td>
                <td>
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {league.last_three_games.map((game, index) => {
                      const { team1, team2, winner } = extractTeamNames(game);
                      return (
                        <li key={index}>
                          <span style={{ color: getTeamColor(team1, winner) }}>
                            {team1}
                          </span>
                          <span style={{ color: "white" }}> vs </span>
                          <span style={{ color: getTeamColor(team2, winner) }}>
                            {team2}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
      <div className="column" style={{ top: "100px" }}>
        {leagues.slice(3, 6).map((league) => (
          <table
            key={league.id}
            onClick={() =>
              handleTableClick(league.name, league.next_three_games)
            }
          >
            <caption
              style={{ fontSize: 18 }}
              onClick={() =>
                handleTableClick(league.name, league.next_three_games)
              }
            >
              {league.name}
            </caption>
            <thead>
              <tr>
                <th>Top Scorer</th>
                <th>Top Team</th>
                <th>Last Three Games</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {league.top_scorer && (
                      <>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: "white",
                          }}
                        >
                          {parseTopScorer(league.top_scorer).playerName}
                        </span>
                        <br />
                        <span
                          style={{ fontSize: 12, textTransform: "capitalize" }}
                        >
                          {parseTopScorer(league.top_scorer).teamName}
                        </span>
                        <br />
                        <span style={{ fontSize: 12 }}>
                          {parseTopScorer(league.top_scorer).goals} Goals,{" "}
                          {parseTopScorer(league.top_scorer).assists} Assists,{" "}
                          {parseTopScorer(league.top_scorer).penalties}{" "}
                          Penalties
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: 18 }}>
                    {parseTopTeam(league.top_team).teamName}
                  </div>
                  <div style={{ fontSize: 14, color: "rgb(15, 255, 80)" }}>
                    {parseTopTeam(league.top_team).wins} Wins
                  </div>
                  <div style={{ fontSize: 14, color: "red" }}>
                    {parseTopTeam(league.top_team).losses} Losses
                  </div>
                  <div style={{ fontSize: 14, color: "orange" }}>
                    {parseTopTeam(league.top_team).draws} Draws
                  </div>
                </td>
                <td>
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {league.last_three_games.map((game, index) => {
                      const { team1, team2, winner } = extractTeamNames(game);
                      return (
                        <li key={index}>
                          <span style={{ color: getTeamColor(team1, winner) }}>
                            {team1}
                          </span>
                          <span style={{ color: "white" }}> vs </span>
                          <span style={{ color: getTeamColor(team2, winner) }}>
                            {team2}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      {favoritedLeague ? (
        <div
          style={{
            fontSize: 22,
            top: "70%",
            position: "absolute",
            color: "white",
            width: "100%",
            textAlign: "center",
          }}
        >
          Upcoming games in{" "}
          <span style={{ fontWeight: "bold", color: "lightblue" }}>
            {favoritedLeague}
          </span>
          <br></br>
          <br></br>
          <div
            style={{
              fontSize: 24,
              top: "80%",
              position: "absolute",
              color: "white",
              width: "100%",
              textAlign: "center",
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              <li>{parseSchedule(favoriteschedule[0])}</li> <br></br>
              <li>{parseSchedule(favoriteschedule[1])}</li> <br></br>
              <li>{parseSchedule(favoriteschedule[2])}</li> <br></br>
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            fontSize: 20,
            color: "white",
            top: "71%",
            position: "absolute",
            width: "100%",
            textAlign: "center",
          }}
        >
          Select a League to show upcoming games...
        </div>
      )}
    </div>
  );
}
