const RAD = Math.PI / 180;
const DAY = 86400000;

export const wrap = (v, n) => ((v % n) + n) % n;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// NOAA's compact solar-position model. Longitude is positive east.
// https://www.gml.noaa.gov/grad/solcalc/solareqns.PDF
export function sunPosition(date = new Date()) {
  const year = date.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const yearDays = (Date.UTC(year + 1, 0, 1) - yearStart) / DAY;
  const dayFraction = (date.getTime() - yearStart) / DAY;
  const gamma = (2 * Math.PI / yearDays) * (dayFraction - 0.5);
  const equation = 229.18 * (
    0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma)
  );
  const declination = 0.006918 - 0.399912 * Math.cos(gamma)
    + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma)
    + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma)
    + 0.00148 * Math.sin(3 * gamma);
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes()
    + date.getUTCSeconds() / 60 + date.getUTCMilliseconds() / 60000;
  const longitude = wrap((720 - minutes - equation) / 4 + 180, 360) - 180;
  const latitude = declination / RAD;
  return { latitude, longitude, equation, declination, vector: geoVector(latitude, longitude) };
}

export function geoVector(latitude, longitude) {
  const lat = latitude * RAD;
  const lon = longitude * RAD;
  return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
}

export function solarElevation(latitude, longitude, sun = sunPosition()) {
  const n = geoVector(latitude, longitude);
  const s = sun.vector;
  return Math.asin(clamp(n[0] * s[0] + n[1] * s[1] + n[2] * s[2], -1, 1)) / RAD;
}

export function zonedParts(date, timezone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
}

export function sunTimes(date, latitude, longitude, timezone) {
  const p = zonedParts(date, timezone);
  const midnight = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day));
  const approxNoon = new Date(midnight + (720 - longitude * 4) * 60000);
  const sun = sunPosition(approxNoon);
  const lat = latitude * RAD;
  const cosHour = Math.cos(90.833 * RAD) / (Math.cos(lat) * Math.cos(sun.declination))
    - Math.tan(lat) * Math.tan(sun.declination);
  if (cosHour > 1) return { sunrise: null, sunset: null, daylight: 0, polar: 'night' };
  if (cosHour < -1) return { sunrise: null, sunset: null, daylight: 24, polar: 'day' };
  const ha = Math.acos(cosHour) / RAD;
  const noon = 720 - 4 * longitude - sun.equation;
  return {
    sunrise: new Date(midnight + (noon - 4 * ha) * 60000),
    sunset: new Date(midnight + (noon + 4 * ha) * 60000),
    daylight: 8 * ha / 60,
    polar: null,
  };
}

export function solarPhase(elevation) {
  if (elevation >= -0.833) return 'Daylight';
  if (elevation >= -6) return 'Twilight';
  return 'After dark';
}
