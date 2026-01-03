import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",       // ✅ ensure output goes to dist
    emptyOutDir: true,    // ✅ clean folder before build
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // ensure correct entry
    },
  },
  publicDir: "public",    // ✅ ensures _redirects is copied
});
