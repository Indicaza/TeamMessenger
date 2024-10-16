import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.css";
import messagesData from "../../assets/messages.json";

const ChatList = ({ onSelectChat }) => {
  const [messages, setMessages] = useState([]);
  const [sortedMessages, setSortedMessages] = useState([]);
  const [clickedMessages, setClickedMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < messagesData.messages.length) {
        const randomIndex = Math.floor(
          Math.random() * messagesData.messages.length
        );
        const newMessage = messagesData.messages[randomIndex];

        if (!messages.some((msg) => msg.id === newMessage.id)) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    const sorted = [...messages].sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setSortedMessages(sorted);
  }, [messages]);

  const handleSelectMessage = (msg) => {
    setClickedMessages((prevClicked) => [...prevClicked, msg.id]);
    onSelectChat(msg);
  };

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((msg) => (
        <li
          key={msg.id}
          className={`${styles.messageItem} ${
            clickedMessages.includes(msg.id) ? styles.clicked : ""
          }`}
          onClick={() => handleSelectMessage(msg)}
        >
          <div className={styles.profileContainer}>
            {!clickedMessages.includes(msg.id) && (
              <>
                <div className={`${styles.neonGlow} ${styles[msg.priority]}`} />
                <div
                  className={`${styles.statusOrb} ${styles[msg.priority]}`}
                />
              </>
            )}
            <img
              src={`https://picsum.photos/seed/${msg.id}/50`}
              alt={msg.name}
              className={styles.profilePic}
            />
          </div>
          <div className={styles.messageContent}>
            <div className={styles.messageHeader}>
              <strong>
                {msg.name} - {msg.role}
              </strong>
            </div>
            <div className={styles.messageDetails}>
              <span>{msg.title}</span>
              <span className={styles.date}>
                {new Date(msg.timestamp).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
