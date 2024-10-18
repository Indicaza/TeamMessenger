import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/icons/*", dest: "assets/icons" }, // Copy icons from src to dist
        { src: "public/manifest.json", dest: "" },
        { src: "public/popup.html", dest: "" },
        { src: "public/popup-style.css", dest: "" },
        { src: "src/background.js", dest: "" }, // Copy background script from src
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/main.jsx"), // Change back to main.jsx
        popup: resolve(__dirname, "./public/popup.html"), // Popup HTML for Chrome extension
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "main") {
            return "src/[name].js"; // Output main.js into dist/src/
          }
          return "[name].js"; // Default for other files
        },
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes("assets/icons")) {
            return "assets/icons/[name][extname]"; // Copy assets/icons to dist/assets/icons
          }
          return "[name][extname]"; // Default for other files
        },
      },
    },
    outDir: "dist",
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ["src", "public"], // Serve from src and public folders during dev
    },
  },
});
