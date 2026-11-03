import { defineConfig } from 'vite';

// Démo en ligne : la vraie carte sur un Home Assistant simulé (demo/).
// `npm run demo` pour la lancer en local, `npm run build:demo` pour produire
// le site statique publié sur GitHub Pages.
export default defineConfig({
  root: 'demo',
  // Relative paths keep the demo deployable under any local or hosted path.
  base: './',
  // The demo runs without Home Assistant, so expose the integration's local
  // furniture catalogue directly. Production still uses /houscape_frontend/.
  publicDir: '../custom_components/houscape/frontend',
  define: {
    'import.meta.env.VITE_HOUSCAPE_FURNITURE_BASE': JSON.stringify('/furniture/'),
  },
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    target: 'es2022',
  },
  server: {
    host: '127.0.0.1',
    port: Number(process.env.DEMO_PORT ?? 4173),
    strictPort: true,
    fs: { allow: ['..'] },
  },
});
