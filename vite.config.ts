import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  //引入resole，alias设置别名
  //如果报错 请 yarn add @types/node -D
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/global.scss";@import "./src/assets/scss/var.scss";`,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://120.221.161.220:9001",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://120.221.161.192:9005/",
        changeOrigin: true,
      },
    },
  },
});
