import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function renderApp() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App />);
}

if (
  typeof globalThis !== "undefined" &&
  globalThis.chrome &&
  globalThis.chrome.storage
) {
  console.log("Chrome APIs are available");
  renderApp();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    if (
      typeof globalThis !== "undefined" &&
      globalThis.chrome &&
      globalThis.chrome.storage
    ) {
      console.log("Chrome APIs are available after DOMContentLoaded");
      renderApp();
    } else {
      console.error(
        "Chrome APIs not available. This extension may not function properly."
      );
      renderApp();
    }
  });
}
