import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/icons/*",
          dest: "assets/icons",
        },
        {
          src: "public/manifest.json",
          dest: "",
        },
        {
          src: "public/popup.html",
          dest: "",
        },
        {
          src: "public/popup-style.css", // Renamed public CSS file
          dest: "",
        },
        {
          src: "src/background.js",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./src/main.jsx",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
