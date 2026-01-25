/// <reference types="vitest" />
import fs from 'fs';
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
            const styleSrc = isDev ? "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com" : "'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com";
            const connectSrc = "https://api.rss2json.com https://api.codetabs.com https://corsproxy.io https://api.allorigins.win https://thingproxy.freeboard.io https://feeds.feedburner.com https://www.bleepingcomputer.com https://www.lemagit.fr https://www.wired.com https://www.zataz.com https://dyrk.org https://www.cert.ssi.gouv.fr https://krebsonsecurity.com https://www.darkreading.com https://www.01net.com";
            const cspContent = `default-src 'self'; script-src ${scriptSrc}; style-src ${styleSrc}; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' ${connectSrc}; img-src 'self'; object-src 'none';`;
            
            let metaDescription = "Actualités et veille de cybersécurité";
            let metaTitle = "Pac-Man Veille";
            try {
              const metadata = JSON.parse(fs.readFileSync('./metadata.json', 'utf-8'));
              if (metadata?.description) {
                metaDescription = metadata.description;
              }
              if (metadata?.name) {
                metaTitle = metadata.name;
              }
            } catch (e) { console.warn("Impossible de lire metadata.json pour le SEO", e); }

            const jsonLd = {
              "@context": "https://schema.org",
              "@type": "NewsMedia",
              "name": metaTitle,
              "url": "https://pacman-veille.fr",
              "description": metaDescription
            };

            return [
              {
                tag: 'meta',
                attrs: {
                  'http-equiv': 'Content-Security-Policy',
                  content: cspContent,
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  name: 'description',
                  content: metaDescription,
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  property: 'og:title',
                  content: metaTitle,
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  property: 'og:description',
                  content: metaDescription,
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  property: 'og:type',
                  content: 'website',
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  name: 'twitter:card',
                  content: 'summary',
                },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: {
                  name: 'robots',
                  content: 'index, follow',
                },
                injectTo: 'head',
              },
              {
                tag: 'link',
                attrs: {
                  rel: 'canonical',
                  href: 'https://pacman-veille.fr/',
                },
                injectTo: 'head',
              },
              {
                tag: 'script',
                attrs: { type: 'application/ld+json' },
                children: JSON.stringify(jsonLd),
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
