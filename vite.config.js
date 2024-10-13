import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "vite-plugin-crx-mv3";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.jsx",
        background: "src/background.js",
        popup: "src/pages/Popup/index.jsx",
        options: "src/pages/Options/index.jsx",
      },
      output: {
        entryFileNames: "src/[name].js",
      },
    },
  },
});
