// Import vite config function
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    // manifest: true,
    rollupOptions: {
      input: "src/client/index.ts",
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
