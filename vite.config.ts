import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: path.resolve(__dirname, "./dist/"), // 新增
  plugins: [vue()],
});
