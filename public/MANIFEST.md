# site.webmanifest Documentation

This file documents the purpose and structure of the `site.webmanifest` file for the David Fernández-Cuenca Portfolio project.

## Purpose

The `site.webmanifest` file enables Progressive Web App (PWA) features and configures favicons and icons for the portfolio site. It allows the site to be installed on devices and provides metadata for a native-like experience.

## Structure

- `name`: Full name of the application (displayed on install prompts).
- `short_name`: Shorter name for homescreen icons.
- `description`: Brief description of the portfolio.
- `icons`: Array of icon objects for different device sizes and resolutions.
- `theme_color`: The color of the browser UI and splash screen.
- `background_color`: The background color for the splash screen.
- `display`: Display mode (usually `standalone` for PWA behavior).
- `start_url`: The start URL when the app is launched from a device.

## Maintenance

- **Keep this documentation and the manifest in English.**
- Update `name`, `short_name`, and `description` if branding changes.
- Add or update icons in `public/assets/` and reference them in the manifest.
- Adjust `theme_color` and `background_color` to match your design.
- For more information, see: [MDN Web Docs - Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 