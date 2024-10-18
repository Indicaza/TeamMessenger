import { useState, useEffect, useCallback } from "react";
import { getStorageItem, setStorageItem } from "../../storageHelper";
import chimeSound from "../../assets/sounds/clunk-notification-alert_D_major.wav";
import messagesData from "../../assets/messages.json";

// Custom hook to manage messages
export const useMessages = (resetTrigger) => {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  useEffect(() => {
    const resetMessagesState = async () => {
      setMessages([]);
      const initialMessages = messagesData.messages.map((message) => ({
        ...message,
        read: false, // Mark all as unread on reset
      }));
      setUnreadMessages(initialMessages); // Reset message pool

      // Save reset state to storage
      await setStorageItem("messages", []);
    };
    resetMessagesState();
  }, [resetTrigger]);

  // Handle user interaction for notification sound
  useEffect(() => {
    const handleInteraction = () => setUserHasInteracted(true);
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  // Load saved messages from storage
  useEffect(() => {
    getStorageItem("messages")
      .then((storedMessages) => {
        if (storedMessages) {
          setMessages(storedMessages);
        }
      })
      .catch(console.error);
  }, []);

  // Save updated messages to local storage
  useEffect(() => {
    setStorageItem("messages", messages).catch(console.error);
  }, [messages]);

  // Add new messages to the list randomly every 1-3 seconds
  useEffect(() => {
    if (unreadMessages.length === 0) return;

    const addRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * unreadMessages.length);
      const newMessage = unreadMessages[randomIndex];
      setUnreadMessages(unreadMessages.filter((_, idx) => idx !== randomIndex));
      setMessages((prev) => [...prev, newMessage]);

      if (newMessage.priority === "high" && userHasInteracted) {
        const audio = new Audio(chimeSound);
        audio.volume = 0.045;
        audio.play().catch(console.error);
      }
    };

    const interval = setInterval(addRandomMessage, Math.random() * 2000 + 1000);
    return () => clearInterval(interval);
  }, [unreadMessages, userHasInteracted]);

  return { messages, setMessages };
};
