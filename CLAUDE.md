# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dangus Mods** is a single-page React website for distributing Minecraft mods independently (outside of platforms like Modrinth). The entire application is contained in a single component file with CSS-in-JS styling.

## Development Environment

The project uses Vite + React for development and building.

**Working directory**: Always work from `dev-server/` subdirectory.

### Commands

From the `dev-server/` directory:
- `npm run dev` - Start Vite development server with HMR (default port: 5173)
- `npm run build` - Build for production (outputs to `dev-server/dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all source files

## Architecture

### Single-File Application Structure

The entire site lives in [dev-server/src/dangus-mods.jsx](dev-server/src/dangus-mods.jsx) (~1629 lines):

1. **MODS Config Array** (lines ~10-102): All mod data - edit this to add/update mods
2. **Site Constants** (lines ~104-106): `SITE_NAME`, `SITE_TAGLINE_PREFIX`, `SITE_TAGLINE_LINK`
3. **Styles** (lines ~111-1062): CSS-in-JS using template literals, injected via `<style>` tags
   - Design system uses CSS custom properties (`:root` variables)
   - Dark theme with green accent (`--accent: #4ade80`)
   - Uses Google Fonts: Chakra Petch (display) and IBM Plex Mono (monospace)
4. **Components** (lines ~1064-1369):
   - `VersionSelector` - Dropdown for selecting game/mod versions
   - `ModCard` - Card display for mods on homepage (3-column grid)
   - `ComingSoonCard` - Placeholder card for upcoming features
   - `ModListItem` - List item for All Mods page
   - `HomePage` - Landing page with hero, featured mods, and info sections
   - `AllModsPage` - Complete mod listing page
   - `AboutPage` - About/info page
   - `ModDetailPage` - Individual mod detail view with tabs (Overview/Versions/Images)
5. **App Component** (line ~1562): Main router using React state (`page`, `modId`)

### Client-Side Routing

Routing is handled entirely through React state (no react-router):
- `page` state: `'home'`, `'all-mods'`, `'about'`, `'mod-detail'`
- `modId` state: tracks which mod to display on detail page
- Navigation via `onNavigate(page, modId)` callback prop

### Asset Management

Images are imported at the top of [dangus-mods.jsx](dev-server/src/dangus-mods.jsx) from `./assets/`:
- `logo.png` - Site logo (nav bar)
- `gagorder-pic.png`, `gagorder-icon.png` - Mod-specific images
- `about.png` - About page image

## Adding a New Mod

Add an entry to the `MODS` array in [dangus-mods.jsx](dev-server/src/dangus-mods.jsx):

```javascript
{
  id: "unique-id",              // Used for routing
  title: "Mod Name",
  slug: "mod-slug",             // URL-friendly identifier
  summary: "Short description", // Shown on cards
  description: "Full markdown description with \n for line breaks",
  platform: "Client + Server",  // or "Client", "Server", "Fabric", etc.
  category: "Utility",          // "Utility", "Gameplay", "Misc", etc.
  bannerColor: "#1a5c2a",       // Hex color for mod detail page banner
  iconEmoji: "🎮",              // Emoji icon (used if no icon image)
  icon: iconImage,              // Optional: imported image
  images: [image1, image2],     // Optional: array of imported images
  comingSoon: true,             // Optional: marks mod as upcoming
  versions: [
    {
      gameVersion: "1.21.11",
      modVersion: "1.0",
      fileName: "modname-1.21.11-1.0",
      downloadUrl: "#",         // Replace with actual download URL
      date: "Feb 8, 2026",
      changelog: [              // Optional: array of changelog strings
        "Initial release"
      ]
    }
  ],
  createdAt: "2025-02-01",
  updatedAt: "2025-02-06",
}
```

**Note**: Download URLs use `"#"` as placeholder. Replace with actual URLs (e.g., GitHub Release asset URLs).

## Design System

CSS custom properties are defined at `:root` in the styles section:

- **Colors**: `--bg-deep`, `--bg-surface`, `--bg-card`, `--text-primary`, `--accent` (green), etc.
- **Typography**: `--font-display` (Chakra Petch), `--font-mono` (IBM Plex Mono)
- **Spacing**: `--radius` (8px), `--radius-lg` (12px)
- **Animation**: `--transition` (0.2s cubic-bezier)

## Entry Point

[dev-server/src/main.jsx](dev-server/src/main.jsx) imports the App component from `dangus-mods.jsx` and renders it into `<div id="root">`.

## Project Structure

```
dev-server/
├── src/
│   ├── dangus-mods.jsx       # Main application (all components + styles)
│   ├── main.jsx              # React entry point
│   ├── assets/               # Images and static assets
│   │   ├── logo.png
│   │   ├── gagorder-pic.png
│   │   ├── gagorder-icon.png
│   │   └── about.png
│   ├── App.jsx               # (unused - legacy from Vite template)
│   ├── App.css               # (unused)
│   └── index.css             # (unused)
├── dist/                     # Build output directory
├── index.html                # HTML template
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Build Output

Running `npm run build` generates static files in `dev-server/dist/` ready for deployment to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).
