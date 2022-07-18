import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeCard from "./components/WelcomeCard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import VotingCard from "./components/VotingCard";
import CreatePoll from "./components/CreatePoll";
import UserHomeScreen from "./components/UserHomeScreen";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // let [teams, setTeams] = useState([]);

  // useEffect(() => {
  //   setTeams(teamsJson);
  // }, []);

  // function incrementVoteCount(teamId) {
  //   teams = teams.map((team) => {
  //     if (team._id === teamId) {
  //       team.votes = team.votes + 1;
  //     }
  //     return team;
  //   });
  //   setTeams(teams);
  // }

  return (<>
    {/* <CreatePoll /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomeCard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user" element={<UserHomeScreen />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/cast-vote" element={<VotingCard />} />
      </Routes>
    </Router>
  </>);
}
export default App;