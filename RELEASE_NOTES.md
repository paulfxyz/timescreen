# Timescreen 2.2.0

Two things you asked for: control over the glow around the planet, and a way to find almost any place on Earth.

## New in 2.2.0

- **Atmosphere control:** Appearance → Display has a new Atmosphere switch and an opacity slider from 10% to 200%. Turn the blue glow off for a crisp, airless planet, soften it, or push it for a dramatic limb. It is saved with your setup and included in Copy setup.
- **Search any place:** the city picker now finds towns, cities and regions worldwide, not only the built-in list. Type a name, or add a region such as “Lagos, Portugal”. Picks show their local time and are remembered after a restart.
- **150 more built-in cities,** including San Francisco, San Diego, Seattle, Miami, Washington D.C., Montreal, Bogotá, Lima, Rome, Athens, Delhi, Beijing, Osaka, Melbourne and Wellington, so common places work offline.

## Privacy note

The only new network request is the place search. When you type two or more characters in the city picker, that text is sent to [Open-Meteo's free geocoding service](https://open-meteo.com/en/docs/geocoding-api) (GeoNames data, CC BY 4.0), which needs no account or key. Nothing is sent otherwise, and the clock, sunlight and your settings stay on your device. Built-in cities work without a connection.

## Upgrading

Mac users already on 2.1.0 receive this through Check for Updates, or automatically if enabled in Settings. The signed update feed is unchanged. Websites need the new files uploaded; older Mac apps keep working against the new site and simply do not save the atmosphere or searched-place choices until they update.

The universal app supports Apple silicon and Intel on macOS 13 or newer. Existing settings are retained, and the old window-position preference is migrated when possible.

This app is **ad-hoc signed, not Apple-notarized**. Signed update files do not turn the app into an Apple-notarized application; if macOS blocks first launch, follow [Apple's per-app Open Anyway instructions](https://support.apple.com/en-us/102445) only if you trust the official download.

## Settings to use

Open Timescreen → Settings, or press Command-comma. Enable automatic updates and launch at login if desired; “Remember window position, size and display” is already on.

Native fullscreen and all clock controls remain available. Closing the clock window leaves the menu-bar launcher running, while Command-Q quits and allows a downloaded automatic update to install.

See [installation instructions](https://github.com/paulfxyz/timescreen/blob/main/INSTALL.md), [security details](https://github.com/paulfxyz/timescreen/blob/main/SECURITY.md), and the [verification scope](https://github.com/paulfxyz/timescreen/blob/main/QA.md).
