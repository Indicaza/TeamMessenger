// useMessages.js
import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../../storageHelper";
import messagesData from "../../assets/messages.json";

export const useMessages = (resetTrigger) => {
  const [messages, setMessages] = useState([]);
  const [unreadPool, setUnreadPool] = useState([]);

  // Reset messages when resetTrigger changes
  useEffect(() => {
    const resetMessages = async () => {
      try {
        console.log("Resetting messages");
        setMessages([]);
        const initialMessages = messagesData.messages.map((msg) => ({
          ...msg,
          read: false,
        }));
        setUnreadPool(initialMessages);
        await setStorageItem("messages", []);
        await setStorageItem("unreadPool", initialMessages);
      } catch (error) {
        console.error("Error resetting messages:", error);
      }
    };
    resetMessages();
  }, [resetTrigger]);

  // Load messages from storage on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await getStorageItem("messages");
        if (storedMessages) {
          console.log("Loaded messages from storage:", storedMessages);
          setMessages(storedMessages);
        } else {
          // No messages in storage, initialize
          setMessages([]);
        }

        const storedUnreadPool = await getStorageItem("unreadPool");
        if (storedUnreadPool) {
          console.log("Loaded unreadPool from storage:", storedUnreadPool);
          setUnreadPool(storedUnreadPool);
        } else {
          // No unreadPool in storage, initialize
          const initialUnreadPool = messagesData.messages.map((msg) => ({
            ...msg,
            read: false,
          }));
          setUnreadPool(initialUnreadPool);
        }
      } catch (error) {
        console.error("Error loading messages from storage:", error);
      }
    };

    loadMessages();
  }, []);

  // Update storage whenever messages or unreadPool change
  useEffect(() => {
    setStorageItem("messages", messages).catch((error) => {
      console.error("Error setting storage item 'messages':", error);
    });
  }, [messages]);

  useEffect(() => {
    setStorageItem("unreadPool", unreadPool).catch((error) => {
      console.error("Error setting storage item 'unreadPool':", error);
    });
  }, [unreadPool]);

  // Add messages at random intervals
  useEffect(() => {
    if (unreadPool.length === 0) return;

    const addMessage = () => {
      const index = Math.floor(Math.random() * unreadPool.length);
      const newMessage = unreadPool[index];
      setUnreadPool((prev) => prev.filter((_, i) => i !== index));
      setMessages((prev) => {
        const updatedMessages = [...prev, newMessage];
        console.log("Added new message:", newMessage);
        return updatedMessages;
      });
    };

    const interval = setInterval(addMessage, Math.random() * 2000 + 1000);
    return () => clearInterval(interval);
  }, [unreadPool]);

  return { messages, setMessages };
};
