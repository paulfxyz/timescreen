import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CITIES } from '../public/themes.js';

test('built-in cities are unique and have valid zones and coordinates', () => {
  assert.ok(CITIES.length >= 150);
  assert.equal(new Set(CITIES.map(c => c.id)).size, CITIES.length);
  for (const c of CITIES) {
    assert.doesNotThrow(() => new Intl.DateTimeFormat('en', { timeZone: c.zone }), c.id);
    if (c.lat !== null) assert.ok(Math.abs(c.lat) <= 90 && Math.abs(c.lon) <= 180, c.id);
  }
  assert.ok(CITIES.some(c => c.id === 'san-francisco' && c.zone === 'America/Los_Angeles'));
});

test('atmosphere and place search controls are wired', () => {
  const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
  const earth = readFileSync(new URL('../public/earth.js', import.meta.url), 'utf8');
  const swift = readFileSync(new URL('../macos/Sources/NativePolicy.swift', import.meta.url), 'utf8');
  assert.match(html, /id="show-atmosphere"/);
  assert.match(html, /id="atmosphere-opacity"[^>]*min="10"[^>]*max="200"/);
  assert.match(html, /id="place-results"/);
  assert.match(earth, /uAtmosphere/);
  for (const key of ['atmosphere', 'atmosphereOpacity', 'pname', 'plat', 'plon']) assert.ok(swift.includes(`"${key}"`), key);
});
