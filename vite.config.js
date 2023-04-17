import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      'chartjs': 'chart.js',
    }
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "Dashboard",
      fileName: () => `dashboard.js`,

      formats: ['umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: "dashboard.[ext]",
      },
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' },
});
