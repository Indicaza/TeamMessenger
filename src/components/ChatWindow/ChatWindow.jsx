import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatWindow.module.css";

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { content: inputValue, type: "user" }]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedChat) {
      const newMessages = [{ content: selectedChat.content, type: "incoming" }];
      setMessages(newMessages);
    } else {
      setMessages([]);
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);

  return (
    <div className={styles.background}>
      <div className={styles.chatWindow}>
        <div className={styles.messageContainer}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.type === "user"
                  ? styles.userMessage
                  : styles.incomingMessage
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.messageInput}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
