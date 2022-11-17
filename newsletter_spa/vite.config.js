import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "../newsletterapp/static/",
  build: {
    outDir: path.resolve("../newsletterapp/static/dist"),
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      input: {
        main: path.resolve("./src/main.jsx"),
      },
      output: {
        chunkFileNames: undefined,
      },
    },
  },
});

