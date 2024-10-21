// offscreen.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "ensureOffscreen") {
    // Do nothing here; offscreen document is already ensured
    sendResponse({ success: true });
  } else if (message.action === "playSound") {
    console.log("Received playSound message in offscreen document");
    const audio = new Audio(
      chrome.runtime.getURL(
        "assets/sounds/clunk-notification-alert_D_major.wav"
      )
    );
    audio.volume = 0.045;
    audio
      .play()
      .then(() => {
        console.log("Audio played successfully");
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
    sendResponse({ success: true });
  }
});
