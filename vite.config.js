// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/icons/*", dest: "assets/icons" },
        { src: "src/assets/sounds/*", dest: "assets/sounds" },
        { src: "public/manifest.json", dest: "" },
        { src: "public/popup.html", dest: "" },
        { src: "public/popup-style.css", dest: "" },
        { src: "public/offscreen.html", dest: "" },
        { src: "src/background.js", dest: "" },
        { src: "src/offscreen.js", dest: "" },
        { src: "src/assets/messages.json", dest: "assets" },
      ],
    }),
  ],
  define: {
    "process.env": {},
    global: "window",
    chrome: "chrome",
    "globalThis.chrome": "chrome",
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/main.jsx"),
        popup: resolve(__dirname, "./public/popup.html"),
        offscreen: resolve(__dirname, "./src/offscreen.js"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "main" || chunkInfo.name === "offscreen") {
            return "src/[name].js";
          }
          return "[name].js";
        },
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes("assets/")) {
            return "assets/[name][extname]";
          }
          return "[name][extname]";
        },
      },
      external: ["chrome"],
    },
    outDir: "dist",
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    keepNames: true,
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ["src", "public"],
    },
  },
});
