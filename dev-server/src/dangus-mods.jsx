import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";
import gagorderPic from "./assets/gagorder-pic.png";
import gagorderIcon from "./assets/gagorder-icon.png";
import aboutImage from "./assets/about.png";

// ============================================================
// MOD DATA CONFIG — Edit this to add/update mods and versions
// ============================================================
const MODS = [
  {
    id: "gag-order",
    title: "Gag Order",
    slug: "gag-order",
    summary: "A mod that allows you to gag happy ghasts to keep them quiet.",
    description: `**A Fabric mod for Minecraft 1.21.10 that adds a ball gag item for Happy Ghasts, a Silence effect, and a chat filter system.**

## **Items**
Gag - Craftable item. Right-click a Happy Ghast to apply it. The ghast is silenced.

Gagged Ghast Tear - Dropped when a gagged Happy Ghast is killed. Used as a brewing ingredient.

Red Ball - Crafting component used to make the Gag. May receive additional uses and color variants in future updates.

## **Potion + Arrows of Silence**
Brewed with a Gagged Ghast Tear and an Awkward Potion. Applies the Silence effect to the player.

## **Silence Effect**
Mutes all sounds client-side for the affected player.

Replaces all chat messages with "mmpf" variants visible to all players.

Message length and capitalization are reflected in the output.

## **3D Gag Model**
Gagged Happy Ghasts display a 3D ball gag overlay with straps wrapped around the head. The model is only visible on adult Happy Ghasts.`,
    platform: "Client + Server",
    category: "Utility",
    bannerColor: "#1a5c2a",
    iconEmoji: "🤐",
    icon: gagorderIcon,
    images: [gagorderPic],
    versions: [
      {
        gameVersion: "1.21.10",
        modVersion: "1.0",
        fileName: "gagorder-1.21.10-1.0",
        downloadUrl: "https://deez125.github.io/dangus-mods/downloads/gagorder-1.21.10-1.0.jar",
        date: "Feb 8, 2026",
        changelog: [
          "Initial release of Gag Order for Minecraft 1.21.10"
        ]
      },
      {
        gameVersion: "1.21.11",
        modVersion: "1.0",
        fileName: "gagorder-1.21.11-1.0",
        downloadUrl: "https://deez125.github.io/dangus-mods/downloads/gagorder-1.21.11-1.0.jar",
        date: "Feb 8, 2026",
        changelog: [
          "Initial release of Gag Order for Minecraft 1.21.11"
        ]
      },
    ],
    createdAt: "2025-02-01",
    updatedAt: "2025-02-06",
  },
  {
    id: "taxcraft",
    title: "TaxCraft",
    slug: "taxcraft",
    summary: "An economics-based mod that brings taxes, trade, and economy management to Minecraft.",
    description: `TaxCraft introduces a full economic system into Minecraft. Set up tax zones, establish trade routes between villages, and manage a dynamic economy that responds to player activity.\n\nFeatures include configurable tax rates, automated collection, villager trade enhancements, and an in-game economy dashboard.`,
    platform: "Server",
    category: "Gameplay",
    bannerColor: "#5c4a1a",
    iconEmoji: "💰",
    comingSoon: true,
    versions: [
      { gameVersion: "1.21.10", modVersion: "0.5.0", fileName: "TaxCraft-0.5.0-fabric-1.21.10.jar", downloadUrl: "#", date: "2025-01-20" },
    ],
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
  },
  {
    id: "example-mod",
    title: "Placeholder Mod",
    slug: "placeholder-mod",
    summary: "A placeholder for your next great mod idea. Replace this with real data!",
    description: `This is a placeholder entry. Replace the data in the MODS config at the top of the source code to add your own mod here.\n\nYou can add as many versions, descriptions, and details as you'd like.`,
    platform: "Client",
    category: "Misc",
    bannerColor: "#3a2a5c",
    iconEmoji: "🧪",
    comingSoon: true,
    versions: [
      { gameVersion: "1.21.10", modVersion: "0.1.0", fileName: "PlaceholderMod-0.1.0.jar", downloadUrl: "#", date: "2025-01-10" },
    ],
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
];

const SITE_NAME = "Dangus Mods";
const SITE_TAGLINE_PREFIX = "Built with spite after Modrinth ";
const SITE_TAGLINE_LINK = "rejected me";

// ============================================================
// STYLES
// ============================================================
const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const css = `
  :root {
    --bg-deep: #0a0c10;
    --bg-surface: #12151c;
    --bg-card: #181c26;
    --bg-card-hover: #1e2332;
    --bg-elevated: #232838;
    --border: #2a3040;
    --border-bright: #3a4560;
    --text-primary: #e8ecf4;
    --text-secondary: #8892a8;
    --text-muted: #5a6478;
    --accent: #4ade80;
    --accent-dim: #22c55e;
    --accent-glow: rgba(74, 222, 128, 0.15);
    --accent-glow-strong: rgba(74, 222, 128, 0.3);
    --danger: #f87171;
    --warning: #fbbf24;
    --font-display: 'Chakra Petch', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
    --radius: 8px;
    --radius-lg: 12px;
    --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg-deep);
    color: var(--text-primary);
    font-family: var(--font-display);
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-deep); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border-bright); }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* NAV */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 12, 16, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
  }
  .nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
    color: var(--text-primary);
    transition: var(--transition);
  }
  .nav-brand:hover { color: var(--accent); }
  .nav-logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    object-fit: cover;
  }
  .nav-title {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nav-link {
    padding: 8px 14px;
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    border: none;
    background: none;
    font-family: var(--font-display);
  }
  .nav-link:hover { color: var(--text-primary); background: var(--bg-card); }
  .nav-link.active { color: var(--accent); background: var(--accent-glow); }

  /* MAIN */
  .main {
    flex: 1;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 32px 24px 80px;
  }

  /* HERO */
  .hero {
    text-align: center;
    padding: 60px 0 48px;
    position: relative;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    background: var(--accent-glow);
    border: 1px solid rgba(74, 222, 128, 0.2);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
  }
  .hero h1 {
    font-size: 44px;
    font-weight: 700;
    letter-spacing: -1.5px;
    line-height: 1.1;
    margin-bottom: 14px;
  }
  .hero h1 span { color: var(--accent); }
  .hero p {
    font-size: 16px;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
  }
  .tagline-link {
    color: var(--accent-dim);
    text-decoration: none;
    cursor: pointer;
  }
  .tagline-link:hover {
    color: var(--accent);
  }

  /* SECTION */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .section-title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .section-action {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    cursor: pointer;
    background: none;
    border: 1px solid rgba(74, 222, 128, 0.2);
    padding: 6px 16px;
    border-radius: 6px;
    font-family: var(--font-display);
    transition: var(--transition);
  }
  .section-action:hover {
    background: var(--accent-glow);
    border-color: var(--accent);
  }

  /* MOD GRID */
  .mod-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 768px) {
    .mod-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .mod-grid { grid-template-columns: 1fr; }
  }

  /* MOD CARD */
  .mod-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
  }
  .mod-card:hover {
    border-color: var(--border-bright);
    background: var(--bg-card-hover);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .mod-card-banner {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    position: relative;
    overflow: hidden;
  }
  .mod-card-banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%);
    pointer-events: none;
  }
  .mod-card-banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 80%;
  }
  .mod-list-icon-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius);
  }
  .mod-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 28px;
  }
  .mod-gallery-img {
    width: 100%;
    height: auto;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
  }
  .mod-gallery-img:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .mod-card-body {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .mod-card-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: -0.3px;
  }
  .mod-card-summary {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .mod-card-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }
  .mod-card-tags {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }
  .mod-card-version {
    font-size: 11px;
    font-weight: 500;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }
  .mod-tag {
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-mono);
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--accent-glow);
    color: var(--accent);
  }
  .mod-tag.category {
    background: rgba(251, 191, 36, 0.1);
    color: var(--warning);
  }

  /* MOD LIST (All Mods page) */
  .mod-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .mod-list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 12px;
    cursor: pointer;
    transition: var(--transition);
  }
  .mod-list-item:hover {
    border-color: var(--border-bright);
    background: var(--bg-card-hover);
    transform: translateX(4px);
  }
  .mod-list-icon {
    width: 72px;
    height: 72px;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    flex-shrink: 0;
  }
  .mod-list-info { flex: 1; min-width: 0; }
  .mod-list-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .mod-list-summary {
    font-size: 13px;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mod-list-tags {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
  .mod-list-download-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius);
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    flex-shrink: 0;
  }
  .mod-list-download-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #000;
  }

  /* MOD DETAIL PAGE */
  .mod-detail-banner {
    height: 200px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    position: relative;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .mod-detail-banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--bg-deep) 100%);
  }
  .mod-detail-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  .mod-detail-header-row {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 24px;
  }
  .mod-detail-icon {
    width: 96px;
    height: 96px;
    border-radius: var(--radius-lg);
    object-fit: cover;
    flex-shrink: 0;
  }
  .mod-detail-info {
    flex: 1;
    min-width: 0;
  }
  .mod-detail-title {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -1px;
    margin-bottom: 6px;
  }
  .mod-detail-summary {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .mod-detail-tags {
    display: flex;
    gap: 8px;
  }
  .header-download-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--accent-dim), #059669);
    border: none;
    border-radius: var(--radius);
    color: #000;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-display);
    cursor: pointer;
    transition: var(--transition);
    flex-shrink: 0;
    align-self: flex-start;
  }
  .header-download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px var(--accent-glow-strong);
  }
  .download-dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  }
  .download-dialog {
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: dropIn 0.2s ease-out;
  }
  .download-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
  }
  .download-dialog-header h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
  }
  .download-dialog-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: var(--transition);
  }
  .download-dialog-close:hover {
    color: var(--text-primary);
  }
  .download-dialog-content {
    padding: 24px;
  }
  /* TABS */
  .mod-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0;
  }
  .mod-tab {
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-display);
    transition: var(--transition);
    position: relative;
    margin-bottom: -1px;
  }
  .mod-tab:hover {
    color: var(--text-primary);
  }
  .mod-tab.active {
    color: var(--accent);
  }
  .mod-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent);
    border-radius: 2px 2px 0 0;
  }

  /* TAB CONTENT */
  .tab-content {
    min-height: 200px;
  }

  /* DESCRIPTION TAB */
  .mod-description-content {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    line-height: 1.8;
    color: var(--text-secondary);
    font-size: 15px;
  }
  .mod-description-content p {
    margin-bottom: 16px;
  }
  .mod-description-content p:last-child {
    margin-bottom: 0;
  }
  .mod-description-content h2 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 24px;
    margin-bottom: 12px;
  }
  .mod-description-content h2:first-child {
    margin-top: 0;
  }
  .mod-description-content strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  /* VERSIONS TAB */
  .version-list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .version-item {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .version-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    gap: 16px;
  }
  .version-item-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }
  .version-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
  .version-item-title {
    font-weight: 700;
    font-size: 15px;
    color: var(--text-primary);
  }
  .version-item-title span {
    color: var(--text-muted);
    font-weight: 500;
  }
  .version-item-meta {
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }
  .version-item-subtitle {
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 2px;
  }
  .version-download-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius);
    color: var(--text-primary);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-display);
    cursor: pointer;
    transition: var(--transition);
    flex-shrink: 0;
  }
  .version-download-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #000;
  }
  .version-changelog {
    padding: 16px 20px;
    padding-left: 44px;
  }
  .version-changelog ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .version-changelog li {
    position: relative;
    padding-left: 16px;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  .version-changelog li:last-child {
    margin-bottom: 0;
  }
  .version-changelog li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--text-muted);
  }
  .version-date {
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  /* DOWNLOAD PANEL */
  .download-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    min-width: 300px;
    max-width: 360px;
  }
  .download-panel-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .download-panel-title svg {
    color: var(--accent);
  }

  /* VERSION SELECTOR */
  .version-selector {
    position: relative;
    margin-bottom: 16px;
  }
  .version-trigger {
    width: 100%;
    padding: 12px 16px;
    background: var(--bg-elevated);
    border: 2px solid var(--border-bright);
    border-radius: var(--radius);
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-display);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition);
  }
  .version-trigger:hover, .version-trigger.open {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  .version-trigger .arrow {
    transition: transform 0.2s;
    font-size: 18px;
    color: var(--text-secondary);
  }
  .version-trigger.open .arrow {
    transform: rotate(180deg);
  }
  .version-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--bg-elevated);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius);
    overflow: hidden;
    z-index: 50;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    animation: dropIn 0.15s ease-out;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .version-search {
    width: 100%;
    padding: 10px 14px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    color: var(--text-primary);
    font-size: 13px;
    font-family: var(--font-display);
    outline: none;
  }
  .version-search::placeholder { color: var(--text-muted); }
  .version-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .version-option {
    padding: 10px 14px;
    cursor: pointer;
    font-size: 14px;
    font-family: var(--font-mono);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .version-option:hover {
    background: var(--accent-glow);
    color: var(--accent);
  }
  .version-option.selected {
    background: var(--accent-glow);
    color: var(--accent);
  }
  .version-option .mod-ver {
    font-size: 11px;
    color: var(--text-muted);
  }
  .version-option:hover .mod-ver { color: var(--accent-dim); }

  /* DOWNLOAD BUTTON */
  .download-btn {
    width: 100%;
    padding: 14px 20px;
    background: linear-gradient(135deg, var(--accent-dim), #059669);
    border: none;
    border-radius: var(--radius);
    color: #000;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-display);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: -0.3px;
  }
  .download-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px var(--accent-glow-strong);
  }
  .download-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .download-file {
    font-size: 11px;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 8px;
    word-break: break-all;
  }

  /* DESCRIPTION */
  .mod-description {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    line-height: 1.8;
    color: var(--text-secondary);
    font-size: 15px;
    white-space: pre-line;
    margin-top: 24px;
  }
  .mod-description-heading {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding: 24px;
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }
  .footer a { color: var(--accent-dim); text-decoration: none; }
  .footer a:hover { color: var(--accent); }

  /* BACK BUTTON */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    background: none;
    border: none;
    font-family: var(--font-display);
    margin-bottom: 20px;
    padding: 6px 12px;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .back-btn:hover { color: var(--accent); background: var(--accent-glow); }

  /* ABOUT PAGE */
  .about-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about-image {
    max-width: 100%;
    border-radius: var(--radius-lg);
  }

  /* COMING SOON CARD */
  .coming-soon-card {
    cursor: default;
    opacity: 0.6;
  }
  .coming-soon-card:hover {
    transform: none;
    box-shadow: none;
  }

  /* ANIMATIONS */
  .fade-in {
    animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .stagger-1 { animation-delay: 0.05s; animation-fill-mode: backwards; }
  .stagger-2 { animation-delay: 0.1s; animation-fill-mode: backwards; }
  .stagger-3 { animation-delay: 0.15s; animation-fill-mode: backwards; }
`;

// ============================================================
// COMPONENTS
// ============================================================

function VersionSelector({ versions, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = versions.filter((v) =>
    v.gameVersion.includes(search)
  );

  return (
    <div className="version-selector" ref={ref}>
      <button
        className={`version-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>
          {selected
            ? `Minecraft ${selected.gameVersion}`
            : "⛏ Select game version"}
        </span>
        <span className="arrow">▾</span>
      </button>
      {open && (
        <div className="version-dropdown">
          <input
            className="version-search"
            placeholder="Search game versions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className="version-list">
            {filtered.map((v) => (
              <div
                key={v.gameVersion}
                className={`version-option ${selected?.gameVersion === v.gameVersion ? "selected" : ""}`}
                onClick={() => {
                  onSelect(v);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <span>{v.gameVersion}</span>
                <span className="mod-ver">v{v.modVersion}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: "12px 14px", color: "var(--text-muted)", fontSize: 13 }}>
                No versions found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ModCard({ mod, onClick }) {
  const hasImage = mod.images && mod.images.length > 0;
  const latestVersion = mod.versions[0]?.gameVersion || "";
  return (
    <div className="mod-card" onClick={onClick}>
      <div
        className="mod-card-banner"
        style={hasImage ? {} : { background: `linear-gradient(135deg, ${mod.bannerColor}, ${mod.bannerColor}88)` }}
      >
        {hasImage ? <img src={mod.images[0]} alt={mod.title} className="mod-card-banner-img" /> : mod.iconEmoji}
      </div>
      <div className="mod-card-body">
        <div className="mod-card-title">{mod.title}</div>
        <div className="mod-card-summary">{mod.summary}</div>
        <div className="mod-card-meta">
          <div className="mod-card-tags">
            <span className="mod-tag">{mod.platform}</span>
            <span className="mod-tag category">{mod.category}</span>
          </div>
          {latestVersion && <span className="mod-card-version">{latestVersion}+</span>}
        </div>
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div className="mod-card coming-soon-card">
      <div className="mod-card-banner" style={{ background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)' }}>
        <span style={{ fontSize: '32px', opacity: 0.5 }}>?</span>
      </div>
      <div className="mod-card-body">
        <div className="mod-card-title" style={{ color: 'var(--text-muted)' }}>Coming soon...</div>
      </div>
    </div>
  );
}

function ModListItem({ mod, onClick, index, onDownloadClick }) {
  const hasIcon = !!mod.icon;
  const latestVersion = mod.versions[0]?.gameVersion || "";
  return (
    <div className={`mod-list-item fade-in stagger-${(index % 3) + 1}`} onClick={onClick}>
      <div
        className="mod-list-icon"
        style={hasIcon ? {} : { background: `linear-gradient(135deg, ${mod.bannerColor}, ${mod.bannerColor}88)` }}
      >
        {hasIcon ? <img src={mod.icon} alt={mod.title} className="mod-list-icon-img" /> : mod.iconEmoji}
      </div>
      <div className="mod-list-info">
        <div className="mod-list-title">{mod.title}</div>
        <div className="mod-list-summary">{mod.summary}</div>
        <div className="mod-list-tags">
          <span className="mod-tag">{mod.platform}</span>
          <span className="mod-tag category">{mod.category}</span>
          {latestVersion && <span className="mod-card-version">{latestVersion}+</span>}
        </div>
      </div>
      <button
        className="mod-list-download-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDownloadClick(mod);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// PAGES
// ============================================================

function HomePage({ onNavigate }) {
  const releasedMods = MODS.filter(m => !m.comingSoon);
  const comingSoonCount = MODS.filter(m => m.comingSoon).length;

  return (
    <div className="fade-in">
      <div className="hero">
        <h1>
          <span>{SITE_NAME}</span>
        </h1>
        <p>{SITE_TAGLINE_PREFIX}<a href="#" onClick={(e) => { e.preventDefault(); onNavigate("about"); }} className="tagline-link">{SITE_TAGLINE_LINK}</a></p>
      </div>

      <div className="section-header">
        <h2 className="section-title">Recent Mods</h2>
        <button className="section-action" onClick={() => onNavigate("all")}>
          View All →
        </button>
      </div>

      <div className="mod-grid">
        {releasedMods.map((mod) => (
          <ModCard
            key={mod.id}
            mod={mod}
            onClick={() => onNavigate("mod", mod.id)}
          />
        ))}
        {[...Array(comingSoonCount)].map((_, i) => (
          <ComingSoonCard key={`coming-soon-${i}`} />
        ))}
      </div>
    </div>
  );
}

function AllModsPage({ onNavigate }) {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [selectedMod, setSelectedMod] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const handleDownloadClick = (mod) => {
    setSelectedMod(mod);
    setSelectedVersion(null);
    setShowDownloadDialog(true);
  };

  const handleVersionDownload = (version) => {
    if (version.downloadUrl && version.downloadUrl !== "#") {
      window.open(version.downloadUrl, "_blank");
    } else {
      alert(
        `Download: ${version.fileName}\n\nReplace the "#" downloadUrl in the MODS config with a real URL (e.g., a GitHub Release asset link or direct file link) to enable real downloads.`
      );
    }
  };

  const releasedMods = MODS.filter(m => !m.comingSoon);

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={() => onNavigate("home")}>
        ← Back to Home
      </button>
      <div className="section-header">
        <h2 className="section-title">All Mods ({releasedMods.length})</h2>
      </div>
      <div className="mod-list">
        {releasedMods.map((mod, i) => (
          <ModListItem
            key={mod.id}
            mod={mod}
            index={i}
            onClick={() => onNavigate("mod", mod.id)}
            onDownloadClick={handleDownloadClick}
          />
        ))}
      </div>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>More mods coming soon</p>

      {showDownloadDialog && selectedMod && (
        <div className="download-dialog-overlay" onClick={() => setShowDownloadDialog(false)}>
          <div className="download-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="download-dialog-header">
              <h3>Download {selectedMod.title}</h3>
              <button className="download-dialog-close" onClick={() => setShowDownloadDialog(false)}>×</button>
            </div>
            <div className="download-dialog-content">
              <VersionSelector
                versions={selectedMod.versions}
                selected={selectedVersion}
                onSelect={setSelectedVersion}
              />
              <button
                className="download-btn"
                disabled={!selectedVersion}
                onClick={() => {
                  if (selectedVersion) {
                    handleVersionDownload(selectedVersion);
                    setShowDownloadDialog(false);
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
              {selectedVersion && (
                <div className="download-file">{selectedVersion.fileName}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="fade-in about-page">
      <img src={aboutImage} alt="About" className="about-image" />
    </div>
  );
}

function parseDescription(text) {
  // Simple markdown-like parser for description
  const lines = text.split('\n');
  const elements = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(' ');
      if (content.trim()) {
        elements.push({ type: 'p', content });
      }
      currentParagraph = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushParagraph();
      elements.push({ type: 'h2', content: line.replace(/^## \*\*|\*\*$/g, '').replace(/\*\*/g, '') });
    } else if (line.trim() === '') {
      flushParagraph();
    } else {
      currentParagraph.push(line.replace(/\*\*/g, ''));
    }
  });
  flushParagraph();

  return elements;
}

function ModDetailPage({ modId, onNavigate }) {
  const mod = MODS.find((m) => m.id === modId);
  const [activeTab, setActiveTab] = useState("description");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  if (!mod) {
    return (
      <div className="fade-in">
        <button className="back-btn" onClick={() => onNavigate("home")}>
          ← Back to Home
        </button>
        <p style={{ color: "var(--text-muted)" }}>Mod not found.</p>
      </div>
    );
  }

  const hasImages = mod.images && mod.images.length > 0;
  const descriptionParts = parseDescription(mod.description);

  const handleVersionDownload = (version) => {
    if (version.downloadUrl && version.downloadUrl !== "#") {
      window.open(version.downloadUrl, "_blank");
    } else {
      alert(
        `Download: ${version.fileName}\n\nReplace the "#" downloadUrl in the MODS config with a real URL (e.g., a GitHub Release asset link or direct file link) to enable real downloads.`
      );
    }
  };

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={() => onNavigate("home")}>
        ← Back to Home
      </button>

      <div className="mod-detail-header-row">
        {mod.icon && (
          <img src={mod.icon} alt={mod.title} className="mod-detail-icon" />
        )}
        <div className="mod-detail-info">
          <div className="mod-detail-title">{mod.title}</div>
          <div className="mod-detail-summary">{mod.summary}</div>
          <div className="mod-detail-tags">
            <span className="mod-tag">{mod.platform}</span>
            <span className="mod-tag category">{mod.category}</span>
          </div>
        </div>
        <button className="header-download-btn" onClick={() => setShowDownloadDialog(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </button>
      </div>

      <div className="mod-tabs">
        <button
          className={`mod-tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`mod-tab ${activeTab === "versions" ? "active" : ""}`}
          onClick={() => setActiveTab("versions")}
        >
          Versions
        </button>
        <button
          className={`mod-tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
          <div className="mod-description-content">
            {descriptionParts.map((part, i) => {
              if (part.type === 'h2') {
                return <h2 key={i}>{part.content}</h2>;
              }
              return <p key={i}>{part.content}</p>;
            })}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="mod-gallery">
            {hasImages ? (
              mod.images.map((img, i) => (
                <img key={i} src={img} alt={`${mod.title} screenshot ${i + 1}`} className="mod-gallery-img" />
              ))
            ) : (
              <p style={{ color: "var(--text-muted)" }}>No images available.</p>
            )}
          </div>
        )}

        {activeTab === "versions" && (
          <div className="version-list-container">
            {mod.versions.map((version, i) => (
              <div key={i} className="version-item">
                <div className="version-item-header">
                  <div className="version-item-info">
                    <div className="version-dot" />
                    <div>
                      <div className="version-item-title">
                        [Fabric] {version.gameVersion}-{version.modVersion}
                      </div>
                      {version.subtitle && (
                        <div className="version-item-subtitle">{version.subtitle}</div>
                      )}
                    </div>
                  </div>
                  <button
                    className="version-download-btn"
                    onClick={() => handleVersionDownload(version)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </button>
                </div>
                {version.changelog && version.changelog.length > 0 && (
                  <div className="version-changelog">
                    <ul>
                      {version.changelog.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    <div className="version-date">{version.date}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showDownloadDialog && (
        <div className="download-dialog-overlay" onClick={() => setShowDownloadDialog(false)}>
          <div className="download-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="download-dialog-header">
              <h3>Download {mod.title}</h3>
              <button className="download-dialog-close" onClick={() => setShowDownloadDialog(false)}>×</button>
            </div>
            <div className="download-dialog-content">
              <VersionSelector
                versions={mod.versions}
                selected={selectedVersion}
                onSelect={setSelectedVersion}
              />
              <button
                className="download-btn"
                disabled={!selectedVersion}
                onClick={() => {
                  if (selectedVersion) {
                    handleVersionDownload(selectedVersion);
                    setShowDownloadDialog(false);
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
              {selectedVersion && (
                <div className="download-file">{selectedVersion.fileName}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// APP
// ============================================================

export default function App() {
  const [page, setPage] = useState("home");
  const [modId, setModId] = useState(null);

  const navigate = (target, id) => {
    if (target === "mod") {
      setPage("mod");
      setModId(id);
    } else {
      setPage(target);
      setModId(null);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <div className="app-container">
        <nav className="nav">
          <div className="nav-inner">
            <div className="nav-brand" onClick={() => navigate("home")}>
              <img src={logo} alt="Logo" className="nav-logo" />
              <span className="nav-title">{SITE_NAME}</span>
            </div>
            <div className="nav-links">
              <button
                className={`nav-link ${page === "home" ? "active" : ""}`}
                onClick={() => navigate("home")}
              >
                Home
              </button>
              <button
                className={`nav-link ${page === "all" ? "active" : ""}`}
                onClick={() => navigate("all")}
              >
                All Mods
              </button>
              <button
                className={`nav-link ${page === "about" ? "active" : ""}`}
                onClick={() => navigate("about")}
              >
                About
              </button>
            </div>
          </div>
        </nav>

        <main className="main">
          {page === "home" && <HomePage onNavigate={navigate} />}
          {page === "all" && <AllModsPage onNavigate={navigate} />}
          {page === "about" && <AboutPage />}
          {page === "mod" && (
            <ModDetailPage modId={modId} onNavigate={navigate} />
          )}
        </main>

        <footer className="footer">
          {SITE_NAME} · Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft. ·{" "}
          <a href="https://github.com" target="_blank" rel="noopener">
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}
