import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  const { isAuthenticated } = useAuth0();
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Router>
      <div className="relative h-screen flex">
        <Sidebar onSelectChat={handleSelectChat} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex justify-center items-center h-full">
            <ChatWindow selectedChat={selectedChat} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
