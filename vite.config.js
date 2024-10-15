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
          src: "src/background.js", // Copy the background.js file
          dest: "src", // Ensure it goes to the src folder inside dist
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.jsx",
      },
      output: {
        entryFileNames: "src/[name].js",
      },
    },
  },
});
