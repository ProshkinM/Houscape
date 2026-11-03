import test from 'node:test';
import assert from 'node:assert/strict';
import { findCards, dashboardPath } from './lovelace-config.mjs';

const dashboard = {
  views: [
    { cards: [
      { type: 'custom:houscape-card', height: 'fill' },
      { type: 'vertical-stack', cards: [{ type: 'custom:houscape-card', scene_id: 'home', model_url: '/local/home.glb' }] },
    ] },
    { sections: [{ cards: [{ type: 'entities', entities: [] }, { type: 'custom:houscape-card', height: 'fill' }] }] },
  ],
};

test('retrouve la carte, même rangée dans une pile', () => {
  const [card] = findCards(dashboard, { type: 'custom:houscape-card', model_url: '/local/home.glb', scene_id: 'home' });
  assert.ok(card);
  card.scene_id = 'salon';
  assert.equal(dashboard.views[0].cards[1].cards[0].scene_id, 'salon', 'on modifie la configuration elle-même');
});

test('deux cartes identiques : impossible de savoir laquelle, on les rend toutes', () => {
  assert.equal(findCards(dashboard, { type: 'custom:houscape-card', height: 'fill' }).length, 2);
});

test('le tableau de bord affiché, depuis l’adresse', () => {
  assert.equal(dashboardPath('/lovelace/0'), null);
  assert.equal(dashboardPath('/'), null);
  assert.equal(dashboardPath('/test-3d/0'), 'test-3d');
  assert.equal(dashboardPath('/dashboard-ciesos/salon'), 'dashboard-ciesos');
});
