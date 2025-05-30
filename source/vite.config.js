import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'axios': 'axios/dist/esm/axios.min.js'
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./php/**", // path to your PHP files
          dest: "./", // destination folder in the dist directory
        },
      ],
    }),
  ],
});
