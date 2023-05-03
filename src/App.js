import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import LeagueBreakdown from "./LeagueBreakdown";
import ArticleAnalysis from "./ArticleAnalysis";
import Home from "./Home";
import Players from "./Players";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/home":
      Component = Home;
      break;
    case "/leaguebreakdown":
      Component = LeagueBreakdown;
      break;
    case "/players":
      Component = Players;
      break;
    case "/analysis-article":
      Component = ArticleAnalysis;
      break;
    case "/signin":
      Component = LoginForm;
      break;
    case "/register":
      Component = RegisterForm;
      break;
  }
  return (
    <div className="App">
      <Navbar />

      <Component />
    </div>
  );
}

export default App;
