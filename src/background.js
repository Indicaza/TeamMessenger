console.log("Background script running.");

// Set up initial alarm based on user preferences
initializeAlarm();

// Listen for storage changes to update the alarm
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.preferences) {
    initializeAlarm();
  }
});

// Function to initialize or update the alarm
function initializeAlarm() {
  chrome.storage.sync.get(["preferences"], (result) => {
    const frequency = result.preferences?.checkFrequency || 1;
    // Clear existing alarm
    chrome.alarms.clear("fetchMessages", () => {
      // Create new alarm
      chrome.alarms.create("fetchMessages", {
        periodInMinutes: parseInt(frequency, 10),
      });
    });
  });
}

// Alarm listener to fetch messages
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "fetchMessages") {
    fetchMessages();
  }
});

async function fetchMessages() {
  try {
    const response = await fetch(chrome.runtime.getURL("messages.json"));
    const data = await response.json();

    chrome.storage.local.get(["messages"], (result) => {
      const storedMessages = result.messages || [];

      // Determine new messages
      const newMessages = data.messages.filter(
        (newMsg) =>
          !storedMessages.some((storedMsg) => storedMsg.id === newMsg.id)
      );

      // Update storage
      const updatedMessages = [...storedMessages, ...newMessages];
      chrome.storage.local.set({ messages: updatedMessages });

      // Update badge
      const unreadCount = updatedMessages.filter((msg) => !msg.read).length;
      chrome.action.setBadgeText({
        text: unreadCount ? unreadCount.toString() : "",
      });

      // Play notification sound for high-priority messages if enabled
      chrome.storage.sync.get(["preferences"], (prefResult) => {
        if (prefResult.preferences?.enableSound) {
          const highPriorityMessages = newMessages.filter(
            (msg) => msg.priority === "high"
          );
          if (highPriorityMessages.length > 0) {
            playNotificationSound();
          }
        }
      });
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

function playNotificationSound() {
  const audio = new Audio(chrome.runtime.getURL("notification.mp3"));
  audio.play();
}

// Initial fetch
fetchMessages();
