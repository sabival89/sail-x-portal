import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // get styled components to work outside twin-macro
        plugins: [
          "babel-plugin-macros",
          "babel-plugin-styled-components",
          "transform-class-properties",
          "istanbul",
        ],
      },
    }),
  ],
  server: {
    port: 8000,
  },
});
