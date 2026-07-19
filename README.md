# 🕷️ CreepingScripts Bookmark Hub & Chrome Extension

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-orange.svg)](#)
[![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue.svg)](#)
[![React](https://img.shields.io/badge/Framework-React%20%2B%20Vite-brightgreen.svg)](#)

**CreepingScripts** is an elegant, high-performance browser extension and web control playground designed for web developers, QA auditors, UI designers, and power users. It functions as an offline-first bookmarklet controller, a custom script manager, and a runtime visual debugger to audit, inspect, and tweak any webpage on the fly.

With the **CreepingScripts Bookmark Hub**, you can instantly test and execute pre-configured bookmarklets or write, validate, and bundle your own custom scripts with built-in syntax compilers and safety defense mechanisms.

---

## 🚀 Key Features

*   **⚡ Categorized Bookmarklet Toolkit**: Instantly execute 15+ curated diagnostic tools on any page:
    *   **Design & Layout**: Grid overlays, element layout outlines, live CSS editing, and visual element zapping.
    *   **Typography & Styling**: Font check, styling/outline audits, and dead image references finder.
    *   **Responsive & Mobile Testing**: Custom mobile view iframe sandboxes, viewport resizing, and instant QR code page generators.
    *   **Development Utilities**: In-place text design mode (making the webpage editable), selection & word count counters.
    *   **Performance & SEO**: Instant validation via W3C validator links, PageSpeed insights auditors, and ARIA role accessibility audits.
*   **🛠️ Custom Snippets Manager**: Write, save, and categorize your own custom JavaScript snippets or bookmarklet links. Organize them into custom categories on the fly.
*   **🛡️ Robust Error Defense System**:
    *   **Real-time Syntax Validation**: Compiles and verifies custom code before saving, alerting you if there are syntax issues.
    *   **Independent Execution Isolation**: Wraps and runs scripts inside safe execution layers to prevent runtime script failures from disrupting your environment.
    *   **Restricted Page Alerts**: Clean alerts notifying you if a script cannot be injected on protected pages (such as `chrome://` or the Web Store).
*   **📂 Lightweight & Native**: Easily bundles your collection into a customized Chrome Manifest V3 Extension ZIP with auto-scaled icons.

---

## 📂 Repository Structure

```text
CreepingScripts/
├── src/                      # React + Vite Web Application Source
│   ├── assets/               # Image resources and logos
│   ├── components/           # UI and modal components
│   ├── bookmarkletsData.ts   # Core dictionary of all preloaded bookmarklets
│   └── App.tsx               # Primary interface, compiler, & ZIP packager
├── extension/                # Ready-to-use unpacked Chrome Extension
│   ├── manifest.json         # Extension config with permission specifications
│   ├── popup.html            # Clean visual extension popup controller
│   ├── popup.js              # Local storage sync & script execution hub
│   ├── icon16.png            # Extension Action Icon (16x16)
│   ├── icon32.png            # Extension Action Icon (32x32)
│   ├── icon48.png            # Extension Action Icon (48x48)
│   ├── icon64.png            # Extension Action Icon (64x64)
│   └── icon128.png           # Extension Action Icon (128x128)
├── scripts/
│   └── generateExtension.js  # Compiler script updating extension resources
├── index.html                # Main App Entrypoint with custom Favicon
├── vite.config.ts            # Vite Configuration
└── package.json              # Project Dependencies & Build Scripts
```

---

## 💾 Installation Guide (Chrome / Edge / Brave / Opera)

### Option A: Download compiled ZIP from Web Hub
1. Open the **CreepingScripts Bookmark Hub** web application.
2. Click the **"Download Extension ZIP"** button to assemble your current scripts and configurations.
3. Extract the downloaded `.zip` file into a dedicated directory on your computer (e.g., `CreepingScripts-Extension`).

### Option B: Use the repository directory
If you cloned this repository, the `/extension` directory is already fully compiled and ready to be loaded!

### Loading the Extension into your Browser:
1. Open your browser and navigate to the Extensions page:
   * **Chrome**: `chrome://extensions/`
   * **Edge**: `edge://extensions/`
   * **Brave**: `brave://extensions/`
2. Toggle the **Developer Mode** switch in the top-right corner to **ON**.
3. Click the **Load unpacked** button in the top-left area.
4. Select the extracted folder (or the `/extension` folder from this repository) containing the `manifest.json` file.
5. Pin **CreepingScripts** to your browser toolbar for instant single-click access on any webpage!

---

## 🛠️ Local Development & Custom Builds

If you want to edit the React web workspace or compile changes to the extension files:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run React App in Development Mode
```bash
npm run dev
```

### 3. Build & Compile Chrome Extension
To update `/extension/popup.html` and `/extension/popup.js` from the React source configurations, run the compiler:
```bash
npx tsx scripts/generateExtension.js
```

### 4. Build React Production Code
```bash
npm run build
```

---

## 🛡️ Security & Boundary Notes

*   **System Restriction Bounds**: Chrome extension sandboxes are blocked by the browser from injecting scripts on internal browser pages (e.g., `chrome://settings`, `edge://extensions`, `about:blank`).
*   **Store Protections**: Browsers prevent script evaluation on official Web Stores (e.g., Chrome Web Store) for user account security.
*   **Content Security Policy (CSP)**: Highly restricted websites may block inline scripts or unsafe string evaluation. CreepingScripts catches these security blocks gracefully and provides helpful explanations.

---

## 📜 License

This project is licensed under the **Apache 2.0 License** - see the LICENSE details. Free for web developers, QA engineers, and open-source investigators!
