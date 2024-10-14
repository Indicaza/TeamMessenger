// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/Login/LoginButton";
import LogoutButton from "./components/Login/LogoutButton";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="relative h-screen flex">
        <Sidebar /> {/* Sidebar stays on the left side */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex justify-center items-center h-full">
            {!isAuthenticated ? <LoginButton /> : null}
          </div>
          <Routes>{/* Define additional routes here */}</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
