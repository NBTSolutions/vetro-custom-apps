import { defineConfig } from "vite";
import { resolve } from "path";

const APP_ID = "__APP_ID__";

function vetroApp(appId: string) {
  return defineConfig({
    base: "http://localhost:8801",
    publicDir: resolve(__dirname, "public"),
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      lib: {
        entry: resolve(__dirname, "src/main.tsx"),
        name: appId,
        fileName: (format) => `app.${format}.js`,
        formats: ["umd"],
      },
    },
  });
}

export default vetroApp(APP_ID);
