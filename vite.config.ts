import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { resolve } from "path";

function root(...paths: string[]): string {
  return resolve(__dirname, ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.MODE, // Forward mode to Javascript.
  root: "src",
  publicDir: root("public"),
  resolve: {
    alias: {
      "@": root("src"),
      "assets": root("src/assets"),
    },
  },
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
    sourcemap: process.env.MODE === "development" ? "inline" : false,
    minify: process.env.MODE === "production" ? "esbuild" : false,
  },
  plugins: [
    vue(),
    vueI18n({
      include: root("src/locales/*"),
    }),
  ],
})
