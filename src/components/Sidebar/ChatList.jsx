import React, { useMemo, useCallback } from "react";
import styles from "./ChatList.module.css";
import { useMessages } from "./useMessages";

// Individual message component
const MessageItem = React.memo(({ message, onMessageClick }) => (
  <li
    key={message.id}
    className={`${styles.messageItem} ${message.read ? styles.read : ""}`}
    onClick={() => onMessageClick(message)}
  >
    <div className={styles.profileContainer}>
      {!message.read && (
        <>
          <div className={`${styles.neonGlow} ${styles[message.priority]}`} />
          <div className={`${styles.statusOrb} ${styles[message.priority]}`} />
        </>
      )}
      <img
        src={`https://picsum.photos/seed/${message.id}/50`}
        alt={message.name}
        className={styles.profilePic}
      />
    </div>
    <div className={styles.messageContent}>
      <div className={styles.messageHeader}>
        <strong>{`${message.name} - ${message.role}`}</strong>
      </div>
      <div className={styles.messageDetails}>
        <span>{message.title}</span>
        <span className={styles.date}>
          {new Date(message.timestamp).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </div>
    </div>
  </li>
));

// Main ChatList component
const ChatList = ({ onSelectChat, resetTrigger }) => {
  const { messages, setMessages } = useMessages(resetTrigger);

  // Sort messages, unread at the top, then by priority
  const sortedMessages = useMemo(() => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...messages].sort((a, b) => {
      if (a.read === b.read) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.read ? 1 : -1;
    });
  }, [messages]);

  // Handle message click
  const handleSelectMessage = useCallback(
    (message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
      onSelectChat(message);
    },
    [setMessages, onSelectChat]
  );

  return (
    <ul className={styles.messageList}>
      {sortedMessages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onMessageClick={handleSelectMessage}
        />
      ))}
    </ul>
  );
};

export default ChatList;
