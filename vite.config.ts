/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'html-csp-inject',
          transformIndexHtml() {
            const isDev = command === 'serve';
            const scriptSrc = isDev ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self'";
            const connectSrc = "https://api.rss2json.com https://api.codetabs.com https://corsproxy.io https://api.allorigins.win https://thingproxy.freeboard.io https://feeds.feedburner.com https://www.bleepingcomputer.com https://www.lemagit.fr https://www.wired.com https://www.zataz.com https://dyrk.org https://www.cert.ssi.gouv.fr https://krebsonsecurity.com https://www.darkreading.com";
            const cspContent = `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' ${connectSrc}; img-src 'self' data:;`;

            return [
              {
                tag: 'meta',
                attrs: {
                  'http-equiv': 'Content-Security-Policy',
                  content: cspContent,
                },
                injectTo: 'head',
              },
            ];
          }
        }
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
      }
    };
});
