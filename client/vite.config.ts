import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/428-point-click-escape/",
  //TODO: the following code assumes our server is on port 5432, confirm this correct
  server: {
    port: 5173,
    proxy: {
      // Anything starting with /api goes to your backend
      "/api": {
        target: "http://localhost:5432",
        changeOrigin: true,
      },
    },
  },
});
