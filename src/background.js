// background.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "ensureOffscreen") {
    const offscreenUrl = chrome.runtime.getURL("offscreen.html");
    const existingClients = await clients.matchAll();
    if (existingClients.some((client) => client.url === offscreenUrl)) {
      console.log("Offscreen document already exists");
      sendResponse({ success: true });
      return;
    }
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play alert sounds for high-priority messages",
    });
    console.log("Offscreen document created");
    sendResponse({ success: true });
  }
});
