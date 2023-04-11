import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "DashboardIQC",
      fileName: () => `dashboard-iqc.js`,

      formats: ['umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: "dashboard-iqc.[ext]",
      },
    },
  },
});
