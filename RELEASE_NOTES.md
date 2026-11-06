# Timescreen 2.3.0

You choose the four cities along the bottom, and the atmosphere finally behaves like a real envelope of air.

## New in 2.3.0

- **Your own world clocks:** Appearance → Display → World clocks lets you set all four places shown beside your main clock. Pick from the built-in list or search any town in the world. Your choices are saved, included in Copy setup, and have a one-tap reset to New York, London, Tokyo and Sydney.
- **A gentler atmosphere:** opacity now runs from 0% to 200% on a smooth curve. At 50% the glow is a thin veil, around 20% it is barely there, and 0% is completely clear. A faint soft haze around the planet makes it read as a gas envelope rather than a hard ring.

## Compatibility

Mac apps on 2.2.x keep working with the new site; they simply do not save the new world-clock choices until they update. Existing setup codes still restore, and the signed update feed is unchanged.

The universal app supports Apple silicon and Intel on macOS 13 or newer. Existing settings are retained, and the old window-position preference is migrated when possible.

This app is **ad-hoc signed, not Apple-notarized**. Signed update files do not turn the app into an Apple-notarized application; if macOS blocks first launch, follow [Apple's per-app Open Anyway instructions](https://support.apple.com/en-us/102445) only if you trust the official download.

## Settings to use

Open Timescreen → Settings, or press Command-comma. Enable automatic updates and launch at login if desired; “Remember window position, size and display” is already on.

Native fullscreen and all clock controls remain available. Closing the clock window leaves the menu-bar launcher running, while Command-Q quits and allows a downloaded automatic update to install.

See [installation instructions](https://github.com/paulfxyz/timescreen/blob/main/INSTALL.md), [security details](https://github.com/paulfxyz/timescreen/blob/main/SECURITY.md), and the [verification scope](https://github.com/paulfxyz/timescreen/blob/main/QA.md).
