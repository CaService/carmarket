import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    fs: {
      allow: ["src", "public", "node_modules", "pdf", path.resolve(__dirname)],
      strict: false,
    },
    proxy: {
      "/api": {
        target: "https://5b5e-82-84-9-104.ngrok-free.app/carmarket",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/server/api"),
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
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
  publicDir: "public",
  assetsInclude: ["**/*.pdf"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
  base: "/carmarket/",
});
