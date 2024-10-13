import React from "react";
import Navbar from "../Navbar/Navbar";
import ChatList from "../Sidebar/ChatList";
import MessageWindow from "../ChatWindow/MessageWindow";
import MessageInput from "../ChatInput/MessageInput";

function Popup() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "400px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <ChatList />
        <MessageWindow />
      </div>
      <MessageInput />
    </div>
  );
}

export default Popup;
