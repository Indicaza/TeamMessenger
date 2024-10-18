import { getStorageItem } from "./storageHelper";

const checkUnreadMessages = async () => {
  const messages = await getStorageItem("messages");
  if (messages) {
    const unreadCount = messages.filter((message) => !message.read).length;
    if (unreadCount > 0) {
      chrome.action.setBadgeText({ text: `${unreadCount}` });
      chrome.action.setBadgeBackgroundColor({ color: "#FF0000" }); // Red badge for unread messages
    } else {
      chrome.action.setBadgeText({ text: "" }); // Clear badge when all are read
    }
  }
};

// Trigger the check every 1 minute (60,000 ms)
setInterval(checkUnreadMessages, 60000); // 1 minute = 60,000 ms

// Run it immediately when the background script starts
checkUnreadMessages();
