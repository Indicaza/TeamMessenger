import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.jsx",
        background: "src/background.js",
        popup: "src/pages/Popup/index.html",
        options: "src/pages/Options/index.html",
      },
      output: {
        entryFileNames: "src/[name].js",
      },
    },
  },
});
