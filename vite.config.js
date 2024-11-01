import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  build: {
    outDir: 'dist', // Make sure this matches the Vercel distDir if set
  },
  // Add the following line if necessary
  server: {
    historyApiFallback: true,
  },
});