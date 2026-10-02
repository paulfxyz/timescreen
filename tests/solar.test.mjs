import test from 'node:test';
import assert from 'node:assert/strict';
import { sunPosition, solarElevation, sunTimes, zonedParts, solarPhase } from '../public/solar.js';
import { THEMES, CITIES } from '../public/themes.js';
import { Earth } from '../public/earth.js';

test('60 distinct themes, each with light and dark palettes', () => {
  assert.equal(THEMES.length, 60);
  assert.equal(new Set(THEMES.map(t => t.id)).size, 60);
  THEMES.forEach(t => {
    for (const mode of ['light','dark']) {
      assert.equal(t[mode].length, 5);
      t[mode].forEach(c => assert.match(c, /^#[0-9a-f]{6}$/i));
    }
  });
});
test('all city time zones are valid', () => {
  CITIES.forEach(c => assert.doesNotThrow(() => zonedParts(new Date(), c.zone)));
});
test('solstice solar declination and subsolar geometry', () => {
  for (const [date, expected] of [['2026-06-21T12:00:00Z',23.44],['2026-12-21T12:00:00Z',-23.44]]) {
    const sun = sunPosition(new Date(date));
    assert.ok(Math.abs(sun.latitude - expected) < 0.5);
    assert.ok(Math.abs(sun.longitude) < 1);
    assert.ok(Math.abs(solarElevation(sun.latitude, sun.longitude, sun) - 90) < 0.0001);
    assert.ok(Math.abs(solarElevation(-sun.latitude, sun.longitude + 180, sun) + 90) < 0.0001);
    assert.ok(Math.abs(Math.hypot(...sun.vector) - 1) < 0.00001);
  }
});
test('March equinox is close to the equator, sunrise and sunset near six and eighteen', () => {
  const date = new Date('2026-03-20T12:00:00Z');
  const sun = sunPosition(date);
  assert.ok(Math.abs(sun.latitude) < 1);
  const times = sunTimes(date, 0, 0, 'UTC');
  assert.ok(times.sunrise.getUTCHours() >= 5 && times.sunrise.getUTCHours() <= 6);
  assert.ok(times.sunset.getUTCHours() >= 18 && times.sunset.getUTCHours() <= 19);
  assert.ok(Math.abs(times.daylight - 12) < .3);
});
test('night/day boundaries are geographically consistent throughout a rotation', () => {
  const sun = sunPosition(new Date('2026-10-02T04:27:00Z'));
  assert.ok(solarElevation(38.7223, -9.1393, sun) < -6, 'Lisbon before dawn');
  assert.ok(solarElevation(35.6762, 139.6503, sun) > 0, 'Tokyo afternoon');
  assert.ok(solarElevation(40.7128, -74.006, sun) < -6, 'New York overnight');
});
test('leap-year model is continuous over the year boundary', () => {
  const before = sunPosition(new Date('2028-12-31T23:59:59Z'));
  const after = sunPosition(new Date('2029-01-01T00:00:00Z'));
  assert.ok(Math.abs(before.latitude - after.latitude) < .1);
});
test('UTC rollover, half-hour zones, and daylight-saving clocks use civil time', () => {
  assert.equal(zonedParts(new Date('2026-10-02T23:59:59Z'),'Asia/Tokyo').day, '03');
  assert.equal(zonedParts(new Date('2026-10-02T00:00:00Z'),'Asia/Kolkata').minute, '30');
  assert.equal(zonedParts(new Date('2026-10-25T00:30:00Z'),'Europe/Lisbon').hour, '01');
  assert.equal(zonedParts(new Date('2026-10-25T01:30:00Z'),'Europe/Lisbon').hour, '01');
});
test('polar-day and polar-night events are not fabricated', () => {
  const summer = sunTimes(new Date('2026-06-21T12:00:00Z'),69.6492,18.9553,'Europe/Oslo');
  const winter = sunTimes(new Date('2026-12-21T12:00:00Z'),69.6492,18.9553,'Europe/Oslo');
  assert.equal(summer.polar, 'day');
  assert.equal(summer.daylight, 24);
  assert.equal(winter.polar, 'night');
  assert.equal(winter.sunrise, null);
  assert.equal(winter.sunset, null);
});
test('sunrise and sunset belong to the selected local day across date-line cities', () => {
  for (const city of CITIES.filter(c => ['lisbon','tokyo','sydney','auckland','honolulu','los-angeles'].includes(c.id))) {
    const date = new Date('2026-10-02T23:30:00Z');
    const target = zonedParts(date, city.zone).day;
    const times = sunTimes(date, city.lat, city.lon, city.zone);
    assert.equal(zonedParts(times.sunrise, city.zone).day, target, `${city.name} sunrise`);
    assert.equal(zonedParts(times.sunset, city.zone).day, target, `${city.name} sunset`);
  }
});
test('twilight thresholds', () => {
  assert.equal(solarPhase(-12), 'After dark');
  assert.equal(solarPhase(-4), 'Twilight');
  assert.equal(solarPhase(10), 'Daylight');
});
test('globe projection is north-up and east-right, not mirrored', () => {
  const view = Object.create(Earth.prototype);
  Object.assign(view, { longitude: 0, latitude: 0, width: 600, height: 600, radius: 200 });
  assert.ok(Math.abs(view.project(0, 0).x - 300) < .001);
  assert.ok(view.project(0, 30).x > 300);
  assert.ok(view.project(0, -30).x < 300);
  assert.ok(view.project(30, 0).y < 300);
  assert.ok(view.project(-30, 0).y > 300);
  assert.ok(view.project(0, 180).depth < 0);
});
