# CreepingScripts — Web Developer Bookmarklet Toolkit & Auto-Injector (v1.1.0)

A powerful, high-performance Chrome / Edge / Brave Manifest V3 Extension bundling **121+ curated JavaScript bookmarklets** with an automated **URL Rule Engine** that automatically executes chosen bookmarklets whenever matching websites are loaded.

---

## ⚡ Key Features

1. **⚡ Automated URL Script Injector (Auto-Rules Engine)**:
   - Define URL wildcard patterns (e.g. `*stream* , *movies*`, `*github.com*`, `*localhost:*`, `https://example.com/*`).
   - Automatically executes scripts on page load (`complete`) or DOM ready (`interactive`).
   - Dedicated Background Service Worker (`background.js`) manages execution, debouncing, and tab badges.
   - Master on/off toggle and individual rule activation switches.
   - Live hit counter telemetry tracking each injection.

2. **121+ Curated Developer Bookmarklets**:
   - **Layout & Grids**: Pesticide, 80px/100px Grid overlays, Wireframe views, Element rulers.
   - **Typography & Colors**: Font stacks inspector, Grayscale contrast audits, Invert colors, Dark mode.
   - **Responsive Testing**: Viewport resizing, Media query diagnostics, Touch target indicators.
   - **Dev & QA Utilities**: Form auto-fillers, Editable page toggles, Cookie editors, Image downloaders.
   - **Security & PopKiller**: Redirect & Popunder blockers, JS endpoint extractors, Mixed content checkers.
   - **SEO & Performance**: Core Web Vitals monitors, Meta tag inspectors, Heading hierarchy analyzers.

3. **Custom Bookmarklet Snippet Manager**:
   - Write or paste custom JavaScript bookmarklets with category assignments.
   - Persistent storage synced across browser sessions via `chrome.storage.local`.

---

## 🚀 How to Install in Chrome, Brave, Edge, Opera

1. **Extract ZIP File**: Unzip the extension archive into a dedicated folder (e.g. `CreepingScripts-Extension`).
2. **Open Extensions Page**:
   - Google Chrome: `chrome://extensions/`
   - Brave: `brave://extensions/`
   - Microsoft Edge: `edge://extensions/`
   - Opera: `opera://extensions/`
3. **Enable Developer Mode**: Toggle the **Developer mode** switch in the top-right corner.
4. **Load Unpacked**: Click the **Load unpacked** button (top-left) and select the extracted folder containing `manifest.json`.
5. **Pin to Toolbar**: Click the Extensions (puzzle piece) icon, find **CreepingScripts Workspace**, and pin it for instant 1-click access!

---

## 🔧 How to Use Auto-Rules

1. Open the CreepingScripts popup by clicking the extension icon.
2. Click the **⚡ Auto-Rules** tab or the **+ New Rule** button.
3. Choose the bookmarklet you want to automate (e.g. *Redirect & Popunder Blocker* or *Grid Overlay*).
4. Enter the URL wildcard pattern (e.g. `*stream*` or `*localhost:*`).
5. Click **Save Auto-Rule**.
6. Whenever you navigate to any matching URL, the script will automatically inject into the page!
