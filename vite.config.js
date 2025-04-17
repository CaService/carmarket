import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],

  // Configurazione del server di sviluppo
  server: {
    port: 5173,
    fs: {
      allow: ["src", "public", "node_modules", "pdf", path.resolve(__dirname)],
      strict: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost/carmarket", // URL locale invece di ngrok
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/server/api"),
      },
    },
  },

  // Configurazione del build
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".pdf")) {
            return "static/pdf/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },

  // Configurazione base per l'ambiente di produzione
  base: mode === "production" ? "/repositories/carmarket/" : "/",

  publicDir: "public",
  assetsInclude: ["**/*.pdf"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
}));
