import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Custom plugin to ensure ads.txt is served at root
    {
      name: 'copy-ads-txt',
      generateBundle(this: any) {
        const adsPath = path.resolve(__dirname, 'public/ads.txt');
        if (fs.existsSync(adsPath)) {
          this.emitFile({
            type: 'asset',
            fileName: 'ads.txt',
            source: fs.readFileSync(adsPath, 'utf-8')
          });
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
}));
