# Contributing

Small, focused improvements are welcome. Keep the interface quiet, preserve both the portrait-monitor and panoramic layouts, and do not add runtime trackers or unnecessary services.

1. Fork and clone the repository.
2. Run `npm ci && npm run build`.
3. Make the change and run `npm test`.
4. Check a 1080×1920 portrait monitor, 1920×576 panoramic view, a normal desktop viewport, and a phone.
5. Check light and dark modes, keyboard focus, reduced motion, and the relevant fallback behavior.

Use issues for a concise bug report or feature proposal. Include the device/browser, viewport, chosen theme/picture settings, reproduction steps, and a screenshot if useful.

Do not commit acquired font or texture binaries, FTP credentials, `.env` files, or local deployment state. Follow [asset licensing](docs/ASSETS.md), and keep `CHANGELOG.md`, screenshots, and tests synchronized with visible changes.
