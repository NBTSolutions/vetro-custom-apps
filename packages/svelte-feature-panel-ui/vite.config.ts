import { defineConfig } from "vite";
import { resolve } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const APP_ID = "__APP_ID__";

function vetroApp(appId: string) {
  return defineConfig({
    plugins: [svelte()],
    base: "http://localhost:8801",
    publicDir: resolve(import.meta.dirname, "public"),
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      lib: {
        entry: resolve(import.meta.dirname, "src/main.ts"),
        name: appId,
        fileName: (format) => `app.${format}.js`,
        formats: ["umd"],
      },
    },
  });
}

export default vetroApp(APP_ID);
