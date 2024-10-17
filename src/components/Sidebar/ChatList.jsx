import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./ChatList.module.css";
import messagesData from "../../assets/messages.json";
import chimeSound from "../../assets/sounds/clunk-notification-alert_D_major.wav";
import { getStorageItem, setStorageItem } from "../../storageHelper";

// Memoized individual message item to avoid unnecessary re-renders
const MessageItem = React.memo(({ msg, clickedMessages, handleClick }) => (
  <li
    key={msg.id}
    className={`${styles.messageItem} ${
      clickedMessages.includes(msg.id) ? styles.clicked : ""
    }`}
    onClick={() => handleClick(msg)}
  >
    <div className={styles.profileContainer}>
      {!clickedMessages.includes(msg.id) && (
        <>
          <div className={`${styles.neonGlow} ${styles[msg.priority]}`} />
          <div className={`${styles.statusOrb} ${styles[msg.priority]}`} />
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
));

const ChatList = ({ onSelectChat }) => {
  const [messages, setMessages] = useState([]);
  const [clickedMessages, setClickedMessages] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);

  // Add event listener for user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const playChime = useCallback(() => {
    if (userInteracted) {
      const audio = new Audio(chimeSound);
      audio.volume = 0.045;
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [userInteracted]);

  // Load messages from storage on mount
  useEffect(() => {
    getStorageItem("messages")
      .then((storedMessages) => {
        if (storedMessages) {
          setMessages(storedMessages);
        }
      })
      .catch((error) =>
        console.error("Error getting messages from storage:", error)
      );
  }, []);

  // Save messages to storage whenever they change
  useEffect(() => {
    setStorageItem("messages", messages).catch((error) =>
      console.error("Error saving messages to storage:", error)
    );
  }, [messages]);

  // Simulate receiving messages over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < messagesData.messages.length) {
        const randomIndex = Math.floor(
          Math.random() * messagesData.messages.length
        );
        const newMessage = messagesData.messages[randomIndex];

        if (!messages.some((msg) => msg.id === newMessage.id)) {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];

            // Play chime if the new message is high priority
            if (newMessage.priority === "high") {
              playChime();
            }

            return updatedMessages;
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [messages, playChime]);

  // Sort messages by priority (memoized for efficiency)
  const sortedMessages = useMemo(() => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...messages].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [messages]);

  const handleSelectMessage = useCallback(
    (msg) => {
      setClickedMessages((prevClicked) => [...prevClicked, msg.id]);
      onSelectChat(msg);
    },
    [onSelectChat]
  );

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((msg) => (
        <MessageItem
          key={msg.id}
          msg={msg}
          clickedMessages={clickedMessages}
          handleClick={handleSelectMessage}
        />
      ))}
    </ul>
  );
};

export default ChatList;
