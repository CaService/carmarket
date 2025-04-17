import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/repositories/carmarket/",
  build: {
    outDir: "dist",
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".pdf")) {
            return "static/pdf/[name][extname]";
          }
          const ext = path.extname(assetInfo.name);
          if (ext === ".css") {
            return `[name]${ext}`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    sourcemap: true,
  },
  publicDir: "public",
  assetsInclude: ["**/*.pdf"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
});
