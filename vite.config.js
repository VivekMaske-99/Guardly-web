import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // forward API requests to the document-scanner backend
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      // when running the scanner UI from the dev server under /doc-scan
      // we also need to forward its API calls to the same backend port.
      "/doc-scan/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/doc-scan/, ""),
      },
    },
  },
});
