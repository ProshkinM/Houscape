import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { asNonIndexed } from './sky-paint.mjs';

test('asNonIndexed preserves geometry that is already non-indexed', () => {
  const geometry = new THREE.IcosahedronGeometry(1, 1);
  assert.equal(geometry.index, null);
  assert.equal(asNonIndexed(geometry), geometry);
});

test('asNonIndexed converts indexed geometry once', () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  assert.notEqual(geometry.index, null);
  const result = asNonIndexed(geometry);
  assert.notEqual(result, geometry);
  assert.equal(result.index, null);
});
