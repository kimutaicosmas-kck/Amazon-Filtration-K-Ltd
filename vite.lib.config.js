import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { amazonJsxPrePlugin } from "./vite.amazon-jsx-plugin.js";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: dir,
  plugins: [
    amazonJsxPrePlugin(dir),
    react({
      exclude: /node_modules|static[\\/]js/,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: path.join(dir, "src", "main.jsx"),
      name: "AmazonSpa",
      formats: ["iife"],
      fileName: () => "main.d12675dc.js",
    },
    outDir: path.join(dir, "static", "js"),
    emptyOutDir: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
