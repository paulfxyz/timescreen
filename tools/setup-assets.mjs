import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(root, 'public/assets');
await mkdir(destination, { recursive: true });
const earthBase = 'https://cs.wellesley.edu/~cs307/threejs/r124/three.js-master/examples/textures/planets/';
const assets = [
  { file:'earth-day.webp', url:`${earthBase}earth_atmos_2048.jpg`, sha:'2faa400d1eade3bc44caf6750d1b772bd9bbb6d87362c02bc7c3304e78fa0a9d', quality:88 },
  { file:'earth-night.webp', url:`${earthBase}earth_lights_2048.png`, sha:'3cc6972d1d5b6310f33ea6ef4cc14a38f1dd141a91d26888206889327d983d7b', quality:85 },
  { file:'earth-specular.webp', url:`${earthBase}earth_specular_2048.jpg`, sha:'2df48906732d7a458b2d0a7cdec51a829262307c6bdee4cfdf079a4dd7c71c69', resize:true, quality:85 },
  { file:'earth-clouds.webp', url:`${earthBase}earth_clouds_2048.png`, sha:'bcfcb9e69d2ecd25b13716d72030c85151f3de5d30904c410a72c7270be51697', resize:true, alpha:true, quality:86 },
  { file:'satoshi-light.woff2', url:'https://cdn.fontshare.com/wf/D7WD5OXZFWQ5T76HSPWAC7MNKAJXE2YG/LUGNSPO5YC34ABNB2O6K7AFDSOJZT56V/WNDVG7O66ENLOD43GS7FBUCC4KMT5OM2.woff2', sha:'8a24f395b65048dea9dece6444525fa3adf180057d82c3f831095bff3feda5a0' },
  { file:'satoshi-regular.woff2', url:'https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2', sha:'50dca57f0b77918e0fb7dac998c3f5ef6b0c2a29657da97658a04f98ac532fc5' },
  { file:'satoshi-medium.woff2', url:'https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2', sha:'af02a72246f53ad49c44a591921edbd39ec8258a03d8cc2e0532aa1e497e85b4' },
  { file:'satoshi-bold.woff2', url:'https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2', sha:'353a7fbfb4475f0c31470a7449226006cb64211c71055ca9db860a8acdaa9f68' },
];
for (const asset of assets) {
  const output = path.join(destination, asset.file);
  if (existsSync(output) && !process.argv.includes('--force')) continue;
  const response = await fetch(asset.url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Asset download failed: ${asset.file} (${response.status})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (createHash('sha256').update(bytes).digest('hex') !== asset.sha) {
    throw new Error(`Asset checksum mismatch: ${asset.file}. Review the upstream change before updating its pinned digest.`);
  }
  if (asset.file.endsWith('.woff2')) await writeFile(output, bytes);
  else {
    let image = sharp(bytes);
    if (asset.alpha) image = image.extractChannel('alpha');
    if (asset.resize) image = image.resize(1024, 512);
    await image.webp({ quality: asset.quality }).toFile(output);
  }
  console.log(`Prepared ${asset.file}`);
}
console.log('Assets ready. Third-party files retain their own licenses; see docs/ASSETS.md.');
