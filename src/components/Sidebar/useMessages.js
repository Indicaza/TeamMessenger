import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../../storageHelper";
import messagesData from "../../assets/messages.json";

export const useMessages = (resetTrigger) => {
  const [messages, setMessages] = useState([]);
  const [unreadPool, setUnreadPool] = useState([]);

  useEffect(() => {
    const resetMessages = async () => {
      setMessages([]);
      const initialMessages = messagesData.messages.map((msg) => ({
        ...msg,
        read: false,
      }));
      setUnreadPool(initialMessages);
      setStorageItem("messages", []);
      setStorageItem("unreadPool", initialMessages);
    };
    resetMessages();
  }, [resetTrigger]);

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await getStorageItem("messages");
      if (storedMessages) setMessages(storedMessages);
      const storedUnreadPool = await getStorageItem("unreadPool");
      if (storedUnreadPool) setUnreadPool(storedUnreadPool);
      else {
        const initialUnreadPool = messagesData.messages.map((msg) => ({
          ...msg,
          read: false,
        }));
        setUnreadPool(initialUnreadPool);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    setStorageItem("messages", messages);
  }, [messages]);

  useEffect(() => {
    setStorageItem("unreadPool", unreadPool);
  }, [unreadPool]);

  useEffect(() => {
    if (unreadPool.length === 0) return;

    const addMessage = () => {
      const index = Math.floor(Math.random() * unreadPool.length);
      const newMessage = unreadPool[index];
      setUnreadPool((prev) => prev.filter((_, i) => i !== index));
      setMessages((prev) => [...prev, newMessage]);
    };

    const interval = setInterval(addMessage, Math.random() * 1000 + 250);
    return () => clearInterval(interval);
  }, [unreadPool]);

  return { messages, setMessages };
};
