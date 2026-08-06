import { defineConfig } from "vite";
import { resolve } from "node:path";

const APP_ID = "__dlTX9EBW7wYM82YT6DM";

function vetroApp(appId: string) {
  return defineConfig({
    base: "http://localhost:8801",
    publicDir: resolve(import.meta.dirname, "public"),
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      lib: {
        entry: resolve(import.meta.dirname, "src/main.tsx"),
        name: appId,
        fileName: (format) => `app.${format}.js`,
        formats: ["umd"],
      },
    },
  });
}

export default vetroApp(APP_ID);
