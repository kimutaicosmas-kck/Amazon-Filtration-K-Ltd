import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { amazonJsxPrePlugin } from "./vite.amazon-jsx-plugin.js";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(dir, "dev-spa"),
  publicDir: false,
  plugins: [
    amazonJsxPrePlugin(dir),
    react({
      exclude: /node_modules|static[\\/]js/,
    }),
  ],
  resolve: {
    alias: {
      "@src": path.join(dir, "src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    fs: {
      allow: [dir],
    },
    proxy: {
      "/backend-php": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        rewrite: (p) => "/amazon" + p,
      },
      "/images": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        rewrite: (p) => "/amazon" + p,
      },
      "/static": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        rewrite: (p) => "/amazon" + p,
      },
    },
  },
});
