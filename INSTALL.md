# Install Timescreen

Timescreen is an HTML5 page, not a background service or a native screensaver. Open it in a browser, move that browser to your spare display, and enter fullscreen.

## From source

Use Node.js 22 or newer and npm:

```sh
git clone https://github.com/paulfxyz/timescreen.git
cd timescreen
npm ci
npm run build
npm start
```

Open `http://localhost:3000`. On first build, the asset script downloads the separately licensed fonts and Earth textures from their original hosts, checks their hashes, and prepares the static site.

An Internet connection is needed for the first installation and asset setup. Once the site is built, no Node.js process or backend is needed on a production host.

## On your vertical monitor

1. Move the browser window to the display you are not using.
2. Choose a theme in **Appearance**.
3. If needed, set Appearance → Display → Layout to **Vertical**.
4. Adjust the page brightness and colour in **Light**.
5. Click **Enter full screen**, or press **F**.
6. Press **H** for quiet mode; use **Escape** or the restore control to bring the interface back.

Fullscreen and screen wake lock depend on your browser and device. On a browser that does not allow native fullscreen, follow the device guidance shown by the app.

## Static hosting

After `npm run build`, upload the contents of `public/` to an HTTPS host:

- Put `index.html` directly in the site's document root.
- Keep the `assets/` folder and relative filenames intact.
- Include `.htaccess` on Apache-compatible hosts; configure equivalent headers and MIME types on other servers.
- Do not upload the entire source repository or any credential files.
- Refresh the page and check `release.json` if you need to confirm the deployed build.

The optional GitHub Actions FTPS workflow is documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). It is not required to run or host Timescreen.

## A phone or tablet

Timescreen includes a home-screen app manifest and offline support. On iPhone, follow [Apple's Add to Home Screen / Open as Web App instructions](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios); on supported Android browsers, use Install app or Add to Home screen.

Load the complete app online once before relying on it offline. The clock uses the device's time, so keep the operating-system clock correct.

## Common questions

- **The page looks wrong when opened as a local file:** use `npm start` or another HTTP server. Browser security restrictions can block JavaScript modules and textures under `file://`.
- **The asset build reports a hash mismatch:** the upstream file changed. Review the change before updating its pinned digest; do not bypass the check blindly.
- **Native fullscreen does not open:** use the browser's fullscreen command or the app's home-screen installation guidance. A website cannot override operating-system restrictions.
- **The globe uses the simpler renderer:** this is the Canvas fallback for a browser without usable WebGL. The clock and sunlight calculation continue to work.
- **A very dim preset is hard to see:** the Light panel stays outside the display filter. Open it and choose Reset picture.
- **I want my setup on another screen:** use Copy setup, then Restore setup on the other device. Current `time:v2:` codes and earlier `solstice:v1:` codes are supported.

## Licensing

The original application code is MIT-licensed. Fonts, textures, and bundled icons retain their own terms; read [docs/ASSETS.md](docs/ASSETS.md) before redistributing a build.
