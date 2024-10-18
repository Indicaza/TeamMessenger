import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./ChatList.module.css";
import messagesData from "../../assets/messages.json";
import chimeSound from "../../assets/sounds/clunk-notification-alert_D_major.wav";
import { getStorageItem, setStorageItem } from "../../storageHelper";

// Memoized individual message item to avoid unnecessary re-renders
const MessageItem = React.memo(({ msg, handleClick }) => (
  <li
    key={msg.id}
    className={`${styles.messageItem} ${msg.read ? styles.read : ""}`}
    onClick={() => handleClick(msg)}
  >
    <div className={styles.profileContainer}>
      {/* Show neon glow and status orb only if the message is unread */}
      {!msg.read && (
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

const ChatList = ({ onSelectChat, resetTrigger }) => {
  const [messages, setMessages] = useState([]);
  const [remainingMessages, setRemainingMessages] = useState([]);
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

  // Reset the state when resetTrigger is incremented
  useEffect(() => {
    const resetMessages = async () => {
      setMessages([]); // Clear displayed messages
      const allMessages = messagesData.messages.map((msg) => ({
        ...msg,
        read: false, // Mark all as unread on reset
      }));
      setRemainingMessages(allMessages); // Reset message pool

      // Save reset state to storage
      await setStorageItem("messages", []);
    };
    resetMessages();
  }, [resetTrigger]);

  // Populate the chat slowly with new messages from JSON
  useEffect(() => {
    if (remainingMessages.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainingMessages.length);
      const newMessage = remainingMessages[randomIndex];

      setRemainingMessages((prev) =>
        prev.filter((_, idx) => idx !== randomIndex)
      );
      setMessages((prevMessages) => {
        if (newMessage.priority === "high") playChime();
        return [...prevMessages, newMessage];
      });
    }, Math.random() * 2000 + 1000); // Interval between 1-3 seconds

    return () => clearInterval(interval);
  }, [remainingMessages, playChime]);

  // Save the state of displayed messages in local storage
  useEffect(() => {
    setStorageItem("messages", messages).catch((error) =>
      console.error("Error saving messages to storage:", error)
    );
  }, [messages]);

  // Memoized sorting of messages (Unread first, then by priority)
  const sortedMessages = useMemo(() => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...messages].sort((a, b) => {
      if (a.read === b.read) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.read ? 1 : -1; // Unread messages go to the top
    });
  }, [messages]);

  // Mark a message as read when selected
  const handleSelectMessage = useCallback(
    (msg) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
      onSelectChat(msg);
    },
    [onSelectChat]
  );

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} handleClick={handleSelectMessage} />
      ))}
    </ul>
  );
};

export default ChatList;
