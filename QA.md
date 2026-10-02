# Time QA inventory

## Required experience

- Real local time advances, uses the device clock, supports city selection and DST-aware IANA zones.
- Animated Earth is recognizably geographic, rotates smoothly, and shows clock-driven sunlight rather than an artificial accelerated solar cycle.
- Layout fits 10:3 ultrawide, ordinary desktop, mobile, and vertical displays without clipping essential regions.
- Light and dark modes, 28 working theme presets, eight background patterns, and six Earth finishes.
- Fullscreen control uses native fullscreen when permitted, with quiet-mode fallback when embedded.

## Controls and states

- Appearance open/close, backdrop dismissal, Escape dismissal, tab navigation and theme selection.
- Every theme in both modes, custom accent, pattern selection, Earth finish selection.
- Pause/resume, rotation speed, drag, wheel zoom, keyboard arrows, recenter.
- City search, no-results state, country/accent search, city selection, device time zone, globe labels, world clock selection.
- Time format, seconds, city labels, night lights, meridians, world clocks, automatic/panoramic/vertical layout.
- Quiet mode with always-recoverable controls, fullscreen entry/exit, blocked fullscreen fallback.
- Wake lock request and unavailable-permission state.
- Reset, setup-code clipboard success or manual-copy fallback, restore valid/invalid codes, reload from setup hash.

## Functional checks

- Node tests: theme count, time zones, solar declination, day/night geography, leap years, date rollover, DST, polar day/night.
- Browser inputs exercise all controls and complete reversible cycles.
- At least one stable animation interval, clock rollover, pause interval and restart.
- Textures, scripts, and fonts load from the site's own bundled assets.

## Visual checks

- 1920 × 576, 1600 × 900, 375 × 812, and 540 × 1800.
- Dark and light initial states.
- Theme drawer, city drawer, blueprint/pattern state, mobile drawer and quiet mode.
- Check document AND clock, globe, world-clock region bounds.
- No console exceptions, clipped digits, overlapping controls, invisible globe, unreadable theme labels, or broken imagery.

## Off-happy-path checks

- WebGL unavailable: actual geographic 2D fallback remains usable.
- Invalid setup hash uses safe defaults.
- Unknown system time zone city: clock remains accurate; unlocated solar estimates are hidden.
- Wake lock, fullscreen or clipboard denied: inline recovery without crashing.
- Reduced motion starts with orbit paused.

## Verification outcome

Completed on 2 October 2026 in Chromium.

- All 11 Node model/configuration tests pass.
- All 28 theme buttons exercised in both light and dark mode.
- All eight patterns and six finishes exercised through the visible controls.
- Clock advancement, continuous rotation, pause/resume, drag, zoom, keyboard movement, and recenter verified.
- City search, empty results, accent-insensitive results, world-clock selection, UTC, and device-zone reset verified.
- Format and visibility switches, URL restoration, custom accent, reset, and wake-lock feedback verified.
- Native fullscreen and blocked-fullscreen fallback exercised; the fallback exits using F, H, or Escape.
- Clipboard-denied recovery presents a selectable portable setup code rather than an expiring preview URL.
- WebGL-disabled route renders a geographic canvas globe. Unknown device-city coordinates hide solar estimates instead of inventing them.
- Reduced-motion preference starts with automatic rotation off; invalid setup parameters fall back safely.
- Layout bounds checked after resize settlement at 1920 × 576, 1600 × 900, 375 × 812, 540 × 1800, and 1280 × 384. No document overflow or out-of-bounds essential regions.
- Dark/light desktop, mobile, tall layout, theme drawer, blueprint finish, and 2D fallback screenshots inspected.
- Exploratory checks caught and fixed a mirrored longitude projection, a mobile grid-row collapse, and wheel events intercepted by city labels.
- No uncaught browser errors in the final local checks.

The globe's viewing animation is intentionally faster than Earth’s physical rotation. The solar calculation always follows the device clock; the app does not accelerate the day/night cycle. Browsers may still deny native fullscreen or screen wake lock in an embedded preview.

Publication preparation: the external Fontshare stylesheet was replaced with unmodified self-hosted WOFF2 files, under the official ITF license's express own-site self-hosting permission. No automatic third-party font request remains.

## Version 1.1.0

- All 16 model/configuration tests pass, including the expanded 60 paired themes, picture ranges/presets, header controls, and fullscreen manifest.
- Brightness, contrast, colour, and temperature were exercised at both slider endpoints using keyboard input. All four picture presets and reset were exercised.
- The Light dialog and top toolbar remain outside the display filter and readable at minimum brightness.
- Theme search and no-results behavior pass. New OLED, Whiteout, Olive, Cobalt, Orchid, Terminal, and Blue marble selections were exercised.
- Native fullscreen entry/exit updates the top-right caption correctly. Denied fullscreen opens device guidance, and display-mode exit remains usable.
- New `time:v2:` codes restore picture controls. Old `solstice:v1:` codes remain compatible.
- The service worker activated successfully. Reloading with the browser offline rendered the clock and textured WebGL globe, with no missing-texture notice.
- Bounds checked at 1920×576, 1600×900, 1024×768, 390×844, 320×568, and 540×1800. No document overflow or clipped essential regions.
- At 320×568, 12-hour world-clock labels and values do not overlap.
- Desktop dark/light, theme drawer, picture panel, mobile main view, and mobile picture controls were inspected and captured.
- Browser automation used Chromium, including responsive layouts and permission-denial simulations. These are not claims of hands-on tests on physical iPhones, Android phones, or TV hardware.
- The repository excludes separately licensed font/texture binaries and original source assets. The bootstrap verifies pinned upstream hashes instead.
