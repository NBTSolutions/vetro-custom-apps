import { defineConfig } from 'vite';
import { resolve } from 'path';

const APP_ID = '__APP_ID__';

function vetroApp(appId: string) {
  return defineConfig({
    base: 'http://localhost:8801',
    publicDir: resolve(__dirname, 'public'),
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      lib: {
        entry: resolve(__dirname, 'src/App.tsx'),
        name: appId,
        fileName: (format) => `app.${format}.js`,
        formats: ['umd'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router-dom', '@nbtsolutions/vetro-app-lib'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            '@nbtsolutions/vetro-app-lib': 'VetroAppLib',
          },
        },
      },
    },
  });
}

export default vetroApp(APP_ID);
