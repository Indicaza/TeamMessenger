import { getStorageItem, setStorageItem } from "./storageHelper";

export const initializeMessages = async (initialMessages) => {
  let storedMessages = await getStorageItem("messages");
  if (!storedMessages) {
    storedMessages = initialMessages.map((message) => ({
      ...message,
      read: false,
    }));
    await setStorageItem("messages", storedMessages);
  }
  return storedMessages;
};

export const markMessageAsRead = async (messageId) => {
  let messages = await getStorageItem("messages");
  if (messages) {
    messages = messages.map((message) =>
      message.id === messageId ? { ...message, read: true } : message
    );
    await setStorageItem("messages", messages);
  }
};
