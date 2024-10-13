import React, { useEffect, useState } from "react";

const Popup = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve messages from Chrome storage
    chrome.storage.local.get(["messages"], (result) => {
      setMessages(result.messages || []);
      setLoading(false);
    });
  }, []);

  const markAsRead = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    chrome.storage.local.set({ messages: updatedMessages });
    updateBadgeCount(updatedMessages);
  };

  const updateBadgeCount = (msgs) => {
    const unreadCount = msgs.filter((msg) => !msg.read).length;
    chrome.action.setBadgeText({
      text: unreadCount ? unreadCount.toString() : "",
    });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (messages.length === 0) {
    return <div className="p-4">No messages.</div>;
  }

  return (
    <div className="p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-4">
          <div
            className={`font-bold ${
              !msg.read ? "text-black" : "text-gray-500"
            }`}
          >
            {msg.content}
          </div>
          <div className="text-sm text-gray-400">
            {new Date(msg.timestamp).toLocaleString()}
          </div>
          {!msg.read && (
            <button
              className="mt-1 text-blue-500"
              onClick={() => markAsRead(msg.id)}
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Popup;
