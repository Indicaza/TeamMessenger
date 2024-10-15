import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.css";
import messagesData from "../../assets/messages.json";

const ChatList = () => {
  const [messages, setMessages] = useState([]);
  const [sortedMessages, setSortedMessages] = useState([]);

  // Simulate receiving messages one at a time
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < messagesData.messages.length) {
        const randomIndex = Math.floor(
          Math.random() * messagesData.messages.length
        );
        const newMessage = messagesData.messages[randomIndex];

        if (!messages.some((msg) => msg.id === newMessage.id)) {
          setMessages([...messages, newMessage]);
        }
      }
    }, 3000); // Every 3 seconds for more fluid interaction

    return () => clearInterval(interval);
  }, [messages]);

  // Sort messages by priority
  useEffect(() => {
    const sorted = [...messages].sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setSortedMessages(sorted);
  }, [messages]);

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((msg) => (
        <li
          key={msg.id}
          className={styles.messageItem}
          style={{ "--random-delay": Math.random() }} // Set a random delay for each message
        >
          <div className={styles.profileContainer}>
            <div className={`${styles.neonGlow} ${styles[msg.priority]}`} />
            <img
              src={`https://picsum.photos/seed/${msg.id}/50`}
              alt={msg.name}
              className={styles.profilePic}
            />
            {/* Status orb */}
            <div className={`${styles.statusOrb} ${styles[msg.priority]}`} />
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
