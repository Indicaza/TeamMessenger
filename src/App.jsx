import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1); // Increment the reset trigger
  };

  useEffect(() => {
    setIsAuthenticated(true); // Mock auth check
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Router>
      <div className="h-screen w-screen flex">
        <Sidebar onSelectChat={handleSelectChat} resetTrigger={resetTrigger} />
        <div className="flex-1 flex flex-col">
          <Navbar
            onLogout={handleLogout}
            userProfile={userProfile}
            onReset={handleReset}
          />
          <div className="flex justify-center items-center flex-1">
            <ChatWindow selectedChat={selectedChat} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
