import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./ChatWindow.module.css";
import { getAIResponse } from "../../api";
import { getStorageItem, setStorageItem } from "../../storageHelper";

const Message = React.memo(({ content, type }) => (
  <div
    className={`${styles.message} ${
      type === "user" ? styles.userMessage : styles.incomingMessage
    }`}
  >
    {content}
  </div>
));

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      getStorageItem(`chat_${selectedChat.id}`)
        .then((storedChatHistory) => {
          if (!storedChatHistory || storedChatHistory.length === 0) {
            const initialMessage = {
              content: selectedChat.content,
              type: "incoming",
            };
            setMessages([initialMessage]);
          } else {
            setMessages(storedChatHistory);
          }
        })
        .catch((error) => {
          console.error("Error getting chat history:", error);
          const initialMessage = {
            content: selectedChat.content,
            type: "incoming",
          };
          setMessages([initialMessage]);
        });
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      setStorageItem(`chat_${selectedChat.id}`, messages).catch((error) => {
        console.error("Error saving chat history:", error);
      });
    }
  }, [messages, selectedChat]);

  const scrollToBottom = useCallback(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!selectedChat) {
      console.error("No chat selected.");
      return;
    }

    if (inputValue.trim()) {
      const userMessage = { content: inputValue, type: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");

      try {
        const aiResponse = await getAIResponse(inputValue, selectedChat, [
          ...messages,
          userMessage,
        ]);
        const aiMessage = { content: aiResponse, type: "incoming" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
      }
    }
  }, [inputValue, selectedChat, messages]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && inputValue.trim()) {
        handleSendMessage();
      }
    },
    [inputValue, handleSendMessage]
  );

  const memoizedMessages = useMemo(
    () =>
      messages.map((msg, index) => (
        <Message key={index} content={msg.content} type={msg.type} />
      )),
    [messages]
  );

  return (
    <div className={styles.background}>
      <div className={styles.chatWindow}>
        {selectedChat ? (
          <>
            <div className={styles.messageContainer}>
              <div className={styles.spacer} />
              {memoizedMessages}
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
          </>
        ) : (
          <div className={styles.noChatSelected}>Please select a chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
