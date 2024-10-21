import React, { useMemo, useCallback, useEffect, useRef } from "react";
import styles from "./ChatList.module.css";
import { useMessages } from "./useMessages";

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

const ChatList = ({ onSelectChat, resetTrigger }) => {
  const { messages, setMessages } = useMessages(resetTrigger);
  const prevMessagesRef = useRef([]);

  const sortedMessages = useMemo(() => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...messages].sort((a, b) => {
      if (a.read === b.read) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.read ? 1 : -1;
    });
  }, [messages]);

  const handleSelectMessage = useCallback(
    (message) => {
      console.log("Message clicked:", message);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
      onSelectChat(message);
    },
    [setMessages, onSelectChat]
  );

  useEffect(() => {
    const prevMessages = prevMessagesRef.current;
    const newHighPriorityMessages = messages.filter(
      (msg) =>
        !msg.read &&
        msg.priority === "high" &&
        !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
    );

    if (newHighPriorityMessages.length > 0) {
      const unreadCount = messages.filter(
        (msg) => !msg.read && msg.priority === "high"
      ).length;

      if (globalThis.chrome && globalThis.chrome.action) {
        globalThis.chrome.action.setBadgeText({ text: `${unreadCount}` });
        globalThis.chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
        console.log(`Badge updated to ${unreadCount}`);
      }

      if (globalThis.chrome && globalThis.chrome.runtime) {
        if (globalThis.chrome.runtime.sendMessage) {
          globalThis.chrome.runtime.sendMessage({ action: "ensureOffscreen" });
          globalThis.chrome.runtime.sendMessage({ action: "playSound" });
        }
      }
    } else {
      const unreadHighPriorityMessages = messages.filter(
        (msg) => !msg.read && msg.priority === "high"
      );
      if (unreadHighPriorityMessages.length === 0) {
        if (globalThis.chrome && globalThis.chrome.action) {
          globalThis.chrome.action.setBadgeText({ text: "" });
          console.log("Badge cleared");
        }
      }
    }

    prevMessagesRef.current = messages;
  }, [messages]);

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
