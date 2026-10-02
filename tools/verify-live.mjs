const base = 'https://time.paulfleury.com/';
const expected = process.env.EXPECTED_COMMIT;
const response = await fetch(`${base}release.json?verify=${Date.now()}`, { signal:AbortSignal.timeout(30000), cache:'no-store' });
if (!response.ok) throw new Error(`Release check returned HTTP ${response.status}`);
const release = await response.json();
if (release.name !== 'Time' || (expected && release.commit !== expected)) {
  throw new Error('The public hostname is not serving the expected release.');
}
for (const file of ['index.html','app.js','style.css','manifest.webmanifest','assets/earth-day.webp','assets/satoshi-light.woff2']) {
  const result = await fetch(`${base}${file}?verify=${Date.now()}`, { method:'HEAD', signal:AbortSignal.timeout(30000), cache:'no-store' });
  if (!result.ok) throw new Error(`${file} returned HTTP ${result.status}`);
}
console.log(`Verified ${base} at ${release.version}, commit ${release.commit}`);
