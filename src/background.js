// background.js

// Placeholder authentication function
function authenticateUser(sendResponse) {
  chrome.storage.local.set(
    {
      accessToken: "dummy_token",
      userProfile: {
        name: "John Doe",
        picture: "/assets/icons/favicon-32x32.png",
      },
    },
    () => {
      sendResponse({ success: true });
    }
  );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "authenticate") {
    authenticateUser(sendResponse);
    return true; // Indicates async response
  }
});
