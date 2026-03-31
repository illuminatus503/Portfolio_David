import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { apiConfig } from "@portfolio/shared";

export default defineConfig({
  plugins: [react()],
  server: {
    port: apiConfig.webPort,
    proxy: {
      "/api": apiConfig.apiBaseUrl
    }
  }
});
