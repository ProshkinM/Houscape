/**
 * dev-entry.ts — point d'entrée servi par Vite en développement.
 *
 * Chargé par Home Assistant via une ressource Lovelace pointant sur
 * http://<ip-dev>:5173/src/dev-entry.ts (voir scripts/ha-dev.mjs).
 *
 * Ce fichier n'entre jamais dans le bundle de production : vite.config.js
 * construit à partir de houscape-card.ts.
 */

// L'intégration installée sur le HA de test peut précéder la maison de
// démonstration : on la sert depuis le dépôt, à côté de ce point d'entrée.
(globalThis as { __HOUSCAPE_DEMO_URL?: string }).__HOUSCAPE_DEMO_URL =
  new URL('../custom_components/houscape/frontend/demo.glb', import.meta.url).href;

// La carte embarquée par l'intégration se charge avant les ressources Lovelace
// et a pu définir l'élément avant nous. On lui laisse notre adresse : au
// prochain chargement, elle nous passera la main (voir la fin de
// houscape-card.ts). Un seul rechargement, pour ne jamais boucler.
const DEV_KEY = 'houscape_dev_entry';
const devUrl = new URL(import.meta.url);
devUrl.search = '';
// Les imports passent avant ce code : l'élément est donc défini, reste à
// savoir par qui.
const bundledFirst = customElements.get('houscape-card') !== HouscapeCard;
try { localStorage.setItem(DEV_KEY, devUrl.href); } catch { /* stockage bloqué */ }
if (bundledFirst && !sessionStorage.getItem('houscape_dev_reloaded')) {
  sessionStorage.setItem('houscape_dev_reloaded', '1');
  location.reload();
}

import { HouscapeCard } from './houscape-card';

// Un custom element ne peut pas être redéfini : le HMR à chaud est un cul-de-sac
// ici. On force donc un rechargement complet de la page à chaque modification,
// ce qui reste bien plus rapide que rebuild + recopie + redémarrage.
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => location.reload());
  import.meta.hot.on('vite:beforeFullReload', () => location.reload());
  import.meta.hot.accept(() => location.reload());

  console.info(
    '%c[Houscape]%c dev mode — auto reload on every save',
    'color:#6C63FF;font-weight:bold',
    'color:inherit',
  );
}
