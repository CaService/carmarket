import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/repositories/carmarket/",
  build: {
    outDir: "dist",
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name);
          if (assetInfo.name.endsWith(".pdf")) {
            return "static/pdf/[name][extname]";
          }
          if (ext === ".css" || ext === ".js") {
            return `[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    cssCodeSplit: false,
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
