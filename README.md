# 🕷️ CreepingScripts - Chrome Extension Bookmarklet Toolkit

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-orange.svg)](#)
[![Manifest Version](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](#)

**CreepingScripts** is an elegant, lightweight Chrome Manifest V3 Extension designed for web developers, QA auditors, UI designers, and power users. It packages 15+ high-performance web auditing bookmarklets into a clean browser Action Popup, allowing you to instantly debug layouts, inspect styling, test responsiveness, and execute custom scripts on any webpage with a single click.

---

## 🚀 Key Features

*   **⚡ Integrated Bookmarklet Toolkit**: Instantly execute 15+ pre-loaded tools categorised for modern workflows:
    *   **Design & Layout**: Grid overlays, element outline debuggers, live CSS injection, and visual element zapping.
    *   **Typography & Styling**: Font inspectors, custom stylesheet audits, and dead image reference checkers.
    *   **Responsive & Viewport Testing**: Custom iframe sandboxes, QR code generation, and mobile viewport simulations.
    *   **Development Utilities**: In-place typography design mode (making any webpage text editable), element selectors, and word counters.
    *   **Performance & SEO**: Quick validation via W3C validator links, PageSpeed insights shortcuts, and ARIA role accessibility checkers.
*   **📂 Custom Script Manager**: Add, edit, and organize your own custom JavaScript snippets and bookmarklets directly inside the extension popup. Save them into personalized categories on the fly.
*   **🛡️ Robust Error Defense System**:
    *   **Real-time Syntax Checker**: Validates your custom JavaScript code before saving and warns you of any syntax errors.
    *   **Execution Isolation**: Safely wraps and evaluates code to ensure external errors do not crash your active tabs.
    *   **Protected Pages Protection**: Gracefully alerts you when running on pages restricted by browser security policies (e.g., Chrome Web Store, internal settings pages).

---

## 📂 Extension Files

This repository contains the lightweight, self-contained extension codebase:

```text
CreepingScripts/
├── manifest.json         # Extension configuration, permissions, and icons
├── popup.html            # The main UI popup interface
├── popup.js              # State engine, local storage management, and script executor
├── README.md             # Guide and overview
├── icon16.png            # Extension Action Icon (16x16)
├── icon32.png            # Extension Action Icon (32x32)
├── icon48.png            # Extension Action Icon (48x48)
├── icon64.png            # Extension Action Icon (64x64)
└── icon128.png           # Extension Action Icon (128x128)
```

---

## 💾 Installation Guide (Chrome / Edge / Brave / Opera)

Since this is a developer utility, you can easily load it as an unpacked extension:

1. **Download / Clone Repository**: Download this folder to your local machine.
2. **Open Extensions Page**: Open your browser and navigate to:
   * **Chrome**: `chrome://extensions/`
   * **Edge**: `edge://extensions/`
   * **Brave**: `brave://extensions/`
3. **Enable Developer Mode**: Toggle the **Developer mode** switch in the top-right corner to **ON**.
4. **Load Unpacked Extension**:
   * Click the **Load unpacked** button in the top-left area.
   * Select the root folder containing the `manifest.json` file.
5. **Pin & Launch**: Pin the **CreepingScripts** icon to your browser toolbar for instant single-click access!

---

## 🛡️ Security & Environment Limitations

*   **System Restriction Bounds**: Chrome extension sandboxes are blocked by modern browsers from executing custom code on internal browser pages (such as `chrome://settings`, `edge://extensions`, or `about:blank`).
*   **Store Protections**: Script execution is restricted on official Web Stores (e.g., Chrome Web Store) for browser account safety.
*   **Content Security Policy (CSP)**: Some heavily restricted domains (e.g., GitHub, Google Accounts) enforce rigid CSP rules blocking inline script injection or evaluation. CreepingScripts catches these security blocks gracefully and provides safe, helpful feedback alerts.

---

## 📜 License

This project is licensed under the **Apache 2.0 License** - free for developers, QA engineers, and open-source designers!
