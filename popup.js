/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Native mirror of tools for autonomous offline extension execution
const TOOLS = [
  {
    "id": "grid-overlay-80",
    "name": "Grid Overlay (80px)",
    "description": "Adds a subtle 80px grid overlay to check alignment across elements.",
    "category": "design_layout",
    "code": "// Grid Overlay 80px style\n(function() {\n  const existing = document.getElementById('grid-overlay-80-style');\n  if (existing) {\n    existing.remove();\n    console.log('80px Grid overlay deactivated.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'grid-overlay-80-style';\n    s.textContent = 'body::before{content:\\\"\\\";position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:9999;background:repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,0,0,0.08) 79px,rgba(255,0,0,0.08) 80px),repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,0,0,0.08) 79px,rgba(255,0,0,0.08) 80px)}';\n    document.head.appendChild(s);\n    console.log('80px Grid overlay activated.');\n  }\n})();"
  },
  {
    "id": "grid-overlay-12",
    "name": "Grid Overlay (12-Col)",
    "description": "Shows a standard CSS Bootstrap 12-column template layout with responsive gutters.",
    "category": "design_layout",
    "code": "// 12-Column Responsive Grid Simulator\n(function() {\n  const d = document;\n  const existing = d.getElementById('grid-overlay-12-div');\n  if (existing) {\n    existing.remove();\n    console.log('12-Column grid overlay deactivated.');\n    return;\n  }\n  const b = d.createElement('div');\n  b.id = 'grid-overlay-12-div';\n  b.style = 'position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:1200px;height:100%;pointer-events:none;z-index:9999;display:flex;gap:24px;padding:0 24px;box-sizing:border-box';\n  for (var i = 0; i < 12; i++) {\n    var c = d.createElement('div');\n    c.style = 'flex:1;background:rgba(255,0,0,0.03);border-left:1px solid rgba(255,0,0,0.06);border-right:1px solid rgba(255,0,0,0.06)';\n    b.appendChild(c);\n  }\n  d.body.appendChild(b);\n  console.log('12-Column grid layout activated.');\n})();"
  },
  {
    "id": "outline-all",
    "name": "Outline All Elements",
    "description": "Adds a red outline border to every object element on the page to audit structural boundaries and detect layout shifting.",
    "category": "design_layout",
    "code": "// Pesticide Style Border Outliner\n(function() {\n  const existing = document.getElementById('outline-all-style');\n  if (existing) {\n    existing.remove();\n    console.log('Outline boundaries audit turned OFF.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'outline-all-style';\n    s.textContent = '*{outline:1px solid rgba(255,0,0,0.35)!important;outline-offset:-1px!important}';\n    document.head.appendChild(s);\n    console.log('Outline boundaries audit activated.');\n  }\n})();"
  },
  {
    "id": "outline-depth-rainbow",
    "name": "Outline by Depth (Rainbow)",
    "description": "Highlights page structures with color-coded borders representing DOM depth nesting levels.",
    "category": "design_layout",
    "code": "// Rainbow DOM Nesting depth tracker\n(function() {\n  const existing = document.getElementById('outline-rainbow-style');\n  if (existing) {\n    existing.remove();\n    document.querySelectorAll('*').forEach(el => el.style.removeProperty('--d'));\n    console.log('Rainbow depth outliner off.');\n  } else {\n    var s = document.createElement('style');\n    s.id = 'outline-rainbow-style';\n    s.textContent = '*{outline:1px solid hsl(calc(var(--d,0)*60),70%,50%)!important;outline-offset:-1px!important}';\n    document.head.appendChild(s);\n    function assign(e, n) {\n      e.style.setProperty('--d', n);\n      Array.from(e.children).forEach(c => assign(c, n+1));\n    }\n    assign(document.body, 0);\n    console.log('Rainbow depth outliner on! Level 0 = Green/Yellow, Level 1 = Red/Purple...');\n  }\n})();"
  },
  {
    "id": "box-model-hover",
    "name": "Show Box Model on Hover",
    "description": "Draws multi-colored borders representing border, padding, and margin spacing dimensions as you cursor hover over components.",
    "category": "design_layout",
    "code": "// Hover Box Model Highlight\n(function() {\n  const styleId = 'hover-box-model-style';\n  let existing = document.getElementById(styleId);\n  if (existing) {\n    existing.remove();\n    console.log('Box model hover disabled');\n  } else {\n    const s = document.createElement('style');\n    s.id = styleId;\n    s.textContent = '.box-hover-hl{box-shadow:inset 0 0 0 1px #ef4444, inset 0 0 0 2px #f59e0b, inset 0 0 0 3px #10b981, inset 0 0 0 4px #3b82f6 !important}';\n    document.head.appendChild(s);\n    \n    document.addEventListener('mouseover', function(e) {\n      if (e.target && e.target.classList) e.target.classList.add('box-hover-hl');\n    });\n    document.addEventListener('mouseout', function(e) {\n      if (e.target && e.target.classList) e.target.classList.remove('box-hover-hl');\n    });\n    console.log('Box model hover activated! Red: Content, Gold: Padding, Green: Border, Blue: Margin shadow.');\n  }\n})();"
  },
  {
    "id": "element-info",
    "name": "Show Element Info Tooltip",
    "description": "Instant popup telemetry widget displaying element tag properties, classes list, ID attributes, and live size metrics under cursor hover.",
    "category": "design_layout",
    "code": "// Cursor Hover Info Tooltip\n(function() {\n  if (window.infoTipActive) {\n    window.infoTipActive = false;\n    document.removeEventListener('mouseover', window.infoTipOver);\n    const x = document.getElementById('el-info-tip'); if(x) x.remove();\n    console.log('Tooltip diagnostic off.');\n  } else {\n    window.infoTipActive = true;\n    window.infoTipOver = function(e) {\n      const el = e.target;\n      if (!el || el.id === 'el-info-tip') return;\n      const rect = el.getBoundingClientRect();\n      const txt = `Tag: <${el.tagName.toLowerCase()}> | Classes: ${el.className || 'none'} | Size: ${Math.round(rect.width)}x${Math.round(rect.height)}px`;\n      \n      let tip = document.getElementById('el-info-tip');\n      if (!tip) {\n        tip = document.createElement('div');\n        tip.id = 'el-info-tip';\n        tip.style.cssText = 'position:fixed;background:#0F172A;border:1px solid #38BDF8;color:#38BDF8;padding:6px 12px;font-family:monospace;font-size:10px;z-index:999999;border-radius:6px;pointer-events:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3)';\n        document.body.appendChild(tip);\n      }\n      tip.textContent = txt;\n      tip.style.top = (e.clientY + 15) + 'px';\n      tip.style.left = (e.clientX + 15) + 'px';\n    };\n    document.addEventListener('mouseover', window.infoTipOver);\n    document.addEventListener('mouseout', () => {\n      const x = document.getElementById('el-info-tip'); if (x) x.remove();\n    });\n    console.log('Tooltip diagnostic active! Hover elements to see structural parameters.');\n  }\n})();"
  },
  {
    "id": "measure-distance",
    "name": "Measure Click Distance",
    "description": "Measure distance between any two selected coordinates on your viewport with automatic horizontal/vertical offsets diagnostics.",
    "category": "design_layout",
    "code": "// Two-point Canvas Distance Calculator\n(function() {\n  const p = [];\n  const onClk = function(e) {\n    p.push({ x: e.clientX, y: e.clientY });\n    console.log(`Point ${p.length}: ${e.clientX}, ${e.clientY}`);\n    if (p.length === 2) {\n      const dx = p[1].x - p[0].x;\n      const dy = p[1].y - p[0].y;\n      const dist = Math.sqrt(dx*dx + dy*dy).toFixed(1);\n      alert(`Measurement Results:\\n---------------------\\nDistance: ${dist}px\\nHorizontal dX: ${dx}px\\nVertical dY: ${dy}px`);\n      document.removeEventListener('click', onClk);\n    }\n  };\n  document.addEventListener('click', onClk);\n  alert('Distance Measurement Tool Active: Click two distinct points on screen.');\n})();"
  },
  {
    "id": "ruler-overlay",
    "name": "Ruler Overlay (Crosshair)",
    "description": "Adds an aligned crosshair grid ruler system that tracks the mouse cursor to check alignments.",
    "category": "design_layout",
    "code": "// Crosshair Ruler Overlay\n(function() {\n  const d = document;\n  const hId = 'cross-h'; const vId = 'cross-v';\n  const h = d.getElementById(hId);\n  if (h) {\n    h.remove(); d.getElementById(vId).remove();\n    console.log('Crosshair ruler disabled.');\n  } else {\n    const horizontal = d.createElement('div'); horizontal.id = hId;\n    horizontal.style = 'position:fixed;top:0;left:0;width:100%;height:1px;background:rgba(239,68,68,0.55);pointer-events:none;z-index:99999';\n    const vertical = d.createElement('div'); vertical.id = vId;\n    vertical.style = 'position:fixed;top:0;left:0;width:1px;height:100%;background:rgba(239,68,68,0.55);pointer-events:none;z-index:99999';\n    d.body.appendChild(horizontal); d.body.appendChild(vertical);\n    d.addEventListener('mousemove', function(e) {\n      horizontal.style.top = e.clientY + 'px';\n      vertical.style.left = e.clientX + 'px';\n    });\n    console.log('Crosshair tracking aligned.');\n  }\n})();"
  },
  {
    "id": "center-guides",
    "name": "Center Alignment Guides",
    "description": "Pivots vertical and horizontal intersection lines at precisely 50% coordinate points to check symmetric parameters.",
    "category": "design_layout",
    "code": "// Center Symmetry Grid Guides\n(function() {\n  const existing = document.getElementById('center-alignment-style');\n  if (existing) {\n    existing.remove();\n    console.log('Center safety guides deactivated.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'center-alignment-style';\n    s.textContent = 'body::before,body::after{content:\\\"\\\";position:fixed;pointer-events:none;z-index:9999;background:rgba(239,68,68,0.45)}body::before{top:50%;left:0;right:0;height:1.5px}body::after{left:50%;top:0;bottom:0;width:1.5px}';\n    document.head.appendChild(s);\n    console.log('Center safety guides activated (symmetric intersections).');\n  }\n})();"
  },
  {
    "id": "baseline-grid",
    "name": "Baseline Grid (Typography)",
    "description": "Overlays a repeating 24px baseline pattern grid to align paragraph content blocks.",
    "category": "design_layout",
    "code": "// typographic 24px baseline grid outliner\n(function() {\n  const existing = document.getElementById('baseline-grid-style');\n  if (existing) {\n    existing.remove();\n    console.log('24px Baseline typography overlay off.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'baseline-grid-style';\n    s.textContent = 'body::before{content:\\\"\\\";position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:9999;background:repeating-linear-gradient(0deg,transparent,transparent 23px,rgba(0,140,255,0.08) 23px,rgba(0,140,255,0.08) 24px)}';\n    document.head.appendChild(s);\n    console.log('24px Baseline typography overlay on.');\n  }\n})();"
  },
  {
    "id": "extract-fonts",
    "name": "Extract All Fonts",
    "description": "Gathers and lists every typographic font-family configuration references used across the page DOM.",
    "category": "typography_colors",
    "code": "// DOM Font families extractor\n(function() {\n  const families = new Set();\n  document.querySelectorAll('*').forEach(el => {\n    const font = window.getComputedStyle(el).fontFamily;\n    if (font) families.add(font.trim());\n  });\n  const arr = [...families];\n  console.log('%cDetected Typography Stacks:', 'font-size: 16px; font-weight: bold; color: #2563EB');\n  arr.forEach((f, i) => console.log(`${i+1}. ${f}`));\n  alert(`Found ${arr.length} unique typography declarations. Details printed in Developer Console.`);\n})();"
  },
  {
    "id": "extract-colors-palette",
    "name": "Extract Color Palette",
    "description": "Finds, counts, and logs every color token used on the page background, text colors, and borders.",
    "category": "typography_colors",
    "code": "// Extract All Color Parameters\n(function() {\n  const colors = new Set();\n  document.querySelectorAll('*').forEach(e => {\n    const style = getComputedStyle(e);\n    ['color', 'backgroundColor', 'borderColor'].forEach(p => {\n      const v = style[p];\n      if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') colors.add(v);\n    });\n  });\n  console.log('%cExtracted Corporate Palette (%d colors):', 'font-size: 15px; font-weight: bold; color: #EC4899', colors.size);\n  [...colors].forEach(c => {\n    console.log(`%c ${c} `, `background:${c}; color:#fff; padding:3px 6px; border-radius:4px; margin:2px; font-family:monospace`);\n  });\n  alert(`Extracted ${colors.size} unique color values! View console outputs.`);\n})();"
  },
  {
    "id": "font-size-all",
    "name": "Show Font Sizes",
    "description": "Draws temporary absolute pixel markers directly above text blocks indicating computed typography sizes.",
    "category": "typography_colors",
    "code": "// Visual Font Size Overlay\n(function() {\n  const existing = document.querySelectorAll('.font-size-marker');\n  if (existing.length) {\n    existing.forEach(x => x.remove());\n    console.log('Font size markers cleared.');\n    return;\n  }\n  document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span').forEach(e => {\n    const fs = parseFloat(getComputedStyle(e).fontSize);\n    if (fs >= 10) {\n      const b = document.createElement('span');\n      b.className = 'font-size-marker';\n      b.textContent = fs + 'px';\n      b.style = 'position:absolute;background:#10B981;color:white;font:9px monospace;padding:1px 3px;border-radius:3px;z-index:10000;pointer-events:none;transform:translateY(-12px)';\n      e.style.position = 'relative';\n      e.appendChild(b);\n    }\n  });\n})();"
  },
  {
    "id": "line-height-all",
    "name": "Show Line Heights",
    "description": "Labels calculated vertical line-interval spacing directly on text headings to inspect vertical typography scale.",
    "category": "typography_colors",
    "code": "// Line Height Metric Diagnostic\n(function() {\n  const existing = document.querySelectorAll('.lh-marker');\n  if (existing.length) {\n    existing.forEach(x => x.remove());\n    console.log('Layout line height markers disabled.');\n    return;\n  }\n  document.querySelectorAll('h1, h2, h3, h4, p').forEach(e => {\n    const lh = getComputedStyle(e).lineHeight;\n    if (lh && lh !== 'normal') {\n      const b = document.createElement('span');\n      b.className = 'lh-marker';\n      b.textContent = 'LH:' + lh;\n      b.style = 'position:absolute;background:#6366F1;color:white;font:8px monospace;padding:1px 3px;border-radius:2px;z-index:9999;pointer-events:none;transform:translateY(12px)';\n      e.style.position = 'relative';\n      e.appendChild(b);\n    }\n  });\n})();"
  },
  {
    "id": "contrast-checker-click",
    "name": "Contrast Click Checker",
    "description": "Click on any element on the page to retrieve foreground color and outer backplate RGB values to check readability.",
    "category": "typography_colors",
    "code": "// Contrast Check Element Targeter\n(function() {\n  const onClk = function(e) {\n    const el = e.target;\n    if (el) {\n      const s = getComputedStyle(el);\n      console.log(`Contrast Audit for <${el.tagName.toLowerCase()}>:`, {\n        textColor: s.color,\n        backgroundColor: s.backgroundColor,\n        fontSize: s.fontSize,\n        fontWeight: s.fontWeight\n      });\n      alert(`Contrast Details:\\nTag: <${el.tagName.toLowerCase()}>\\nForeground: ${s.color}\\nBackground: ${s.backgroundColor}\\nUse these settings in WCAG checkers to evaluate accessibility compliance!`);\n      document.removeEventListener('click', onClk);\n    }\n    e.preventDefault();\n  };\n  document.addEventListener('click', onClk);\n  alert('Contrast Checker Click Mode Active: Click on a text element.');\n})();"
  },
  {
    "id": "text-small-highlight",
    "name": "Highlight Small Text",
    "description": "Outlines any micro-copy elements configured below 12px in warning colors to flag accessibility issues.",
    "category": "typography_colors",
    "code": "// Highlight Small Fonts (<12px)\n(function() {\n  let c = 0;\n  document.querySelectorAll('p, span, a, li, div').forEach(e => {\n    // extract length\n    if (e.children.length === 0 && e.textContent.trim() !== '') {\n      const fs = parseFloat(getComputedStyle(e).fontSize);\n      if (fs > 0 && fs < 12) {\n        e.style.outline = '2.5px dashed #EF4444';\n        e.style.outlineOffset = '2px';\n        c++;\n      }\n    }\n  });\n  alert(`Found ${c} elements configured with font sizes under 12px. Marked in red dashed outlines.`);\n})();"
  },
  {
    "id": "font-weight-distribution",
    "name": "Font Weight Distribution",
    "description": "Compiles a diagnostic distribution logging weight density across elements.",
    "category": "typography_colors",
    "code": "// Visual Font Weight Map Analyzer\n(function() {\n  const map = {};\n  document.querySelectorAll('*').forEach(e => {\n    if (e.textContent.trim() !== '') {\n      const weight = getComputedStyle(e).fontWeight;\n      map[weight] = (map[weight] || 0) + 1;\n    }\n  });\n  console.log('%cTypography CSS Weights Ratio:', 'font-size:15px; font-weight:bold; color:#7C3AED');\n  Object.entries(map).sort((a,b)=>b[1]-a[1]).forEach(([w, count]) => {\n    console.log(`Weight: ${w} -> applied across ${count} tags.`);\n  });\n  alert('Font weight ratio compiled on debugger console!');\n})();"
  },
  {
    "id": "extract-css-variables",
    "name": "Extract CSS Variables",
    "description": "Finds, extracts, and lists all CSS custom property tokens defined across styles sheet rules.",
    "category": "typography_colors",
    "code": "// Extracted Theme CSS variables\n(function() {\n  const vars = {};\n  try {\n    Array.from(document.styleSheets).forEach(sheet => {\n      try {\n        Array.from(sheet.cssRules).forEach(rule => {\n          if (rule.style) {\n            Array.from(rule.style).forEach(prop => {\n              if (prop.startsWith('--')) {\n                vars[prop] = rule.style.getPropertyValue(prop).trim();\n              }\n            });\n          }\n        });\n      } catch(e) {}\n    });\n  } catch(e) {}\n  \n  const entries = Object.entries(vars);\n  if (entries.length === 0) {\n    alert('No root custom properties (--css-prop) detected.');\n    return;\n  }\n  console.log('%cCSS Custom Tokens Matrix:', 'font-size:15px; font-weight:bold; color:#0D9488', vars);\n  entries.forEach(([key, val]) => {\n    console.log(`%c ${key} %c ${val} `, 'background:#1E293B; color:#F1F5F9; padding:2px 4px; border-radius:3px 0 0 3px', 'background:#0D9488; color:#fff; padding:2px 4px; border-radius:0 3px 3px 0');\n  });\n  alert(`Found ${entries.length} variables. Active design codes print cataloged in console.`);\n})();"
  },
  {
    "id": "hex-color-picker",
    "name": "Color Eye Dropper",
    "description": "Leverages browser EyeDropper API to pick colors directly from viewport elements, outputting HEX values.",
    "category": "typography_colors",
    "code": "// Native Browser HTML Eye Dropper\n(function() {\n  if (!window.EyeDropper) {\n    alert('The EyeDropper API is not supported in this browser version. Use Chrome/Edge/Brave.');\n    return;\n  }\n  const picker = new window.EyeDropper();\n  console.log('Eye dropper active: click on any pixel...');\n  picker.open().then(result => {\n    console.log('Selected Color Hex Value:', result.sRGBHex);\n    alert(`Extracted Hex: ${result.sRGBHex}\\nCopied to Clipboard!`);\n    navigator.clipboard.writeText(result.sRGBHex);\n  }).catch(err => {\n    console.log('EyeDropper closed without selection.', err);\n  });\n})();"
  },
  {
    "id": "typography-scale-vis",
    "name": "Typography Scale Visualizer",
    "description": "Renders an visual panel demonstrating font scaling multipliers across heading structures.",
    "category": "typography_colors",
    "code": "// Computed Heading Scale Calculator\n(function() {\n  const d = document;\n  const old = d.getElementById('typo-scale-panel'); if (old) old.remove();\n  const b = d.createElement('div');\n  b.id = 'typo-scale-panel';\n  b.style = 'position:fixed;top:15px;right:15px;background:#1E293B;color:#F8FAFC;border:1px solid #475569;padding:16px;z-index:99999;font-family:system-ui;width:280px;border-radius:8px;box-shadow:0 10px 20px rgba(0,0,0,0.3)';\n  \n  let h = '<h3 style=\"margin:0 0 10px;font-size:13px;font-weight:bold;color:#60A5FA;border-bottom:1px solid #475569;padding-bottom:4px\">Typographic System scale</h3>';\n  ['h1','h2','h3','h4','p'].forEach(t => {\n    const e = d.querySelector(t);\n    if (e) {\n      const s = getComputedStyle(e);\n      h += `<div style=\"margin:6px 0;font-size:10px;display:flex;justify-content:space-between\"><span><b>${t.toUpperCase()}:</b></span> <span style=\"font-family:monospace\">${s.fontSize} / ${s.lineHeight}</span></div>`;\n    } else {\n      h += `<div style=\"margin:6px 0;font-size:10px;color:#64748B;display:flex;justify-content:space-between\"><span><b>${t.toUpperCase()}:</b></span> <span>N/A</span></div>`;\n    }\n  });\n  b.innerHTML = h + '<button onclick=\"this.parentElement.remove()\" style=\"margin-top:12px;width:100%;padding:5px;border-radius:4px;background:#475569;color:#F8FAFC;border:none;cursor:pointer;font-size:10px;font-weight:bold\">Dismiss</button>';\n  d.body.appendChild(b);\n})();"
  },
  {
    "id": "viewport-size-display",
    "name": "Viewport Size Overlay",
    "description": "Displays viewport dimension vectors and device pixel counters in real time as the browser window resizes.",
    "category": "responsive_testing",
    "code": "// Viewport Sizer telemetry tracker\n(function() {\n  const widgetId = 'viewport-size-widget';\n  const old = document.getElementById(widgetId);\n  if (old) {\n    old.remove();\n    window.removeEventListener('resize', window.updateVSize);\n    console.log('Sizer utility off.');\n  } else {\n    const b = document.createElement('div');\n    b.id = widgetId;\n    b.style.cssText = 'position:fixed;bottom:16px;right:16px;background:rgba(15,23,42,0.95);border:1.5px solid #10B981;color:#10B981;padding:8px 12px;font-family:monospace;font-size:12px;font-weight:bold;z-index:999999;border-radius:6px;pointer-events:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3)';\n    document.body.appendChild(b);\n    window.updateVSize = function() {\n      b.textContent = `Viewport: ${window.innerWidth} x ${window.innerHeight} px @ ${window.devicePixelRatio}x`;\n    };\n    window.updateVSize();\n    window.addEventListener('resize', window.updateVSize);\n    console.log('Sizer utility on! Resize the browser viewport window.');\n  }\n})();"
  },
  {
    "id": "breakpoint-detector",
    "name": "Breakpoint Detector",
    "description": "Displays CSS Tailwind responsive classes (sm, md, lg, xl) matching your active screen sizes.",
    "category": "responsive_testing",
    "code": "// Tailwind Breakpoint monitor\n(function() {\n  const widgetId = 'breakpoint-widget';\n  const existing = document.getElementById(widgetId);\n  if (existing) {\n    existing.remove();\n    window.removeEventListener('resize', window.updateBreakp);\n    console.log('Breakpoint detector off.');\n  } else {\n    const b = document.createElement('div');\n    b.id = widgetId;\n    b.style.cssText = 'position:fixed;top:16px;left:16px;background:#3B82F6;color:white;padding:8px 12px;font-family:monospace;font-size:12px;font-weight:bold;z-index:999999;border-radius:6px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3);pointer-events:none';\n    document.body.appendChild(b);\n    window.updateBreakp = function() {\n      const w = window.innerWidth;\n      let label = 'XS (Mobile <640px)';\n      if (w >= 1536) { b.style.background = '#EC4899'; label = '2XL (Wide >=1536px)'; }\n      else if (w >= 1280) { b.style.background = '#8B5CF6'; label = 'XL (Standard Desktop >=1280px)'; }\n      else if (w >= 1024) { b.style.background = '#3B82F6'; label = 'LG (Laptop >=1024px)'; }\n      else if (w >= 768) { b.style.background = '#10B981'; label = 'MD (Tablet >=768px)'; }\n      else if (w >= 640) { b.style.background = '#F59E0B'; label = 'SM (Mobile Landscape >=640px)'; }\n      else { b.style.background = '#EF4444'; }\n      b.textContent = `${w}px - CSS Breakpoint: ${label}`;\n    };\n    window.updateBreakp();\n    window.addEventListener('resize', window.updateBreakp);\n    console.log('Breakpoint detector activated.');\n  }\n})();"
  },
  {
    "id": "device-simulator-iphone",
    "name": "iPhone Simulator Frame",
    "description": "Renders the active webpage inside an SVG mock phone chassis centered with standard boundaries.",
    "category": "responsive_testing",
    "code": "// iPhone chassis emulation frames wrapper\n(function() {\n  const containerId = 'iphone-wrapper';\n  const existing = document.getElementById(containerId);\n  if (existing) {\n    existing.remove();\n    console.log('Device simulation wrapper discarded.');\n    return;\n  }\n  const wrapper = document.createElement('div');\n  wrapper.id = containerId;\n  wrapper.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:375px;height:812px;border:14px solid #1E293B;border-radius:40px;overflow:hidden;z-index:999999;background:#000;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5)';\n  \n  const iframe = document.createElement('iframe');\n  iframe.src = window.location.href;\n  iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: white';\n  wrapper.appendChild(iframe);\n  \n  const closeBtn = document.createElement('button');\n  closeBtn.textContent = '✕ Close Frame';\n  closeBtn.style.cssText = 'position:absolute;top:12px;right:12px;background:#EF4444;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-family:sans-serif;font-size:11px;font-weight:bold';\n  closeBtn.onclick = () => wrapper.remove();\n  wrapper.appendChild(closeBtn);\n  \n  document.body.appendChild(wrapper);\n  console.log('iPhone layout emulation frame activated.');\n})();"
  },
  {
    "id": "touch-event-tester",
    "name": "Touch Event Simulator",
    "description": "Translates classic click coordinates into responsive mobile Touch interaction signals to inspect slider elements.",
    "category": "responsive_testing",
    "code": "// Click Event to Touch Event converter\n(function() {\n  const handler = function(e) {\n    if (!e.target) return;\n    const touch = new Touch({\n      identifier: Date.now(),\n      target: e.target,\n      clientX: e.clientX,\n      clientY: e.clientY,\n      screenX: e.screenX,\n      screenY: e.screenY,\n      pageX: e.pageX,\n      pageY: e.pageY\n    });\n    const touchStart = new TouchEvent('touchstart', {\n      touches: [touch],\n      targetTouches: [touch],\n      changedTouches: [touch],\n      bubbles: true,\n      cancelable: true\n    });\n    e.target.dispatchEvent(touchStart);\n    console.log('Fired simulated touchstart at coordinate:', e.clientX, e.clientY);\n  };\n  \n  if (window.touchSimActive) {\n    window.touchSimActive = false;\n    document.removeEventListener('mousedown', handler);\n    alert('Touch interactions simulator disabled.');\n  } else {\n    window.touchSimActive = true;\n    document.addEventListener('mousedown', handler);\n    alert('Touch interactions simulator active! Click events translate into native TouchStart coordinates.');\n  }\n})();"
  },
  {
    "id": "network-throttle-2g",
    "name": "2G Connection Faker",
    "description": "Overrides standard connection objects, reporting low bandwidth speeds to let scripts simulate lazy load limits.",
    "category": "responsive_testing",
    "code": "// Override Network Speed Profiles\n(function() {\n  const code = `\n    Object.defineProperty(navigator, \"connection\", {\n      get: function() {\n        return {\n          effectiveType: \"2g\",\n          rtt: 1500,\n          downlink: 0.1,\n          saveData: true\n        };\n      },\n      configurable: true\n    });\n    console.log(\"Faked navigator connection status to: 2G Throttling Profile.\");\n  `;\n  const s = document.createElement('script');\n  s.textContent = code;\n  document.head.appendChild(s);\n  alert('Connection profiles updated. Navigator scripts will simulate cellular 2G networks loading budgets.');\n})();"
  },
  {
    "id": "print-preview-tester",
    "name": "Print CSS Styles Preview",
    "description": "Enforces printing media rules directly into the standard viewport browser layouts to visually audit style properties.",
    "category": "responsive_testing",
    "code": "// Force Print Media stylesheet injection\n(function() {\n  const stylesheetId = 'print-media-faker';\n  const existing = document.getElementById(stylesheetId);\n  if (existing) {\n    existing.remove();\n    console.log('Print preview simulation disabled.');\n  } else {\n    const style = document.createElement('style');\n    style.id = stylesheetId;\n    style.innerHTML = `\n      @media screen {\n        body { background: white !important; color: black !important; font-family: serif !important; }\n        nav, footer, .sidebar, button, .no-print { display: none !important; }\n        img { filter: grayscale(100%) !important; max-width: 100% !important; }\n        a::after { content: \" (\" attr(href) \")\"; font-size: 80%; color: #666; }\n      }\n    `;\n    document.head.appendChild(style);\n    console.log('Force printing preview turned ON. Check layout printability!');\n  }\n})();"
  },
  {
    "id": "dark-mode-invert",
    "name": "Invert Dark Mode",
    "description": "Inverts parent layout hues while preserving image fidelity to inspect light-to-dark contrasting options.",
    "category": "responsive_testing",
    "code": "// Chromatic Layout Inversion\n(function() {\n  const html = document.documentElement;\n  const isCurrentlyInverted = html.style.filter.includes('invert');\n  \n  if (isCurrentlyInverted) {\n    html.style.removeProperty('filter');\n    document.querySelectorAll('img, video, iframe, [class*=\"no-invert\"]').forEach(e => {\n      e.style.removeProperty('filter');\n    });\n    console.log('Chromatic inversion reverted.');\n  } else {\n    html.style.filter = 'invert(1) hue-rotate(180deg)';\n    document.querySelectorAll('img, video, iframe, [class*=\"no-invert\"]').forEach(e => {\n      e.style.filter = 'invert(1) hue-rotate(180deg)';\n    });\n    console.log('Inverted viewport contrast. Verified eye safe dark theme simulation.');\n  }\n})();"
  },
  {
    "id": "no-scroll-test",
    "name": "Toggle Page Scroll",
    "description": "Disables scrolling on the main page viewport to check fixed layouts, models, or header containers.",
    "category": "responsive_testing",
    "code": "// Viewport Scroll Lock\n(function() {\n  const b = document.body; const h = document.documentElement;\n  if (b.style.overflow === 'hidden') {\n    b.style.removeProperty('overflow');\n    h.style.removeProperty('overflow');\n    console.log('Viewport scrolling unlocked.');\n  } else {\n    b.style.overflow = 'hidden';\n    h.style.overflow = 'hidden';\n    console.log('Viewport scrolling locked. Test active modals or sticky alignments.');\n  }\n})();"
  },
  {
    "id": "scroll-frequency-test",
    "name": "Scroll Performance Test",
    "description": "Launches a 5-second frequency diagnostics module logging frame rates and rendering limits.",
    "category": "responsive_testing",
    "code": "// Scroll dispatch listener\n(function() {\n  let scrollCount = 0;\n  const begin = Date.now();\n  const tick = () => { scrollCount++; };\n  \n  window.addEventListener('scroll', tick);\n  console.log('Frequency tracker active for 5 seconds! Slide mouse scroll vigorously.');\n  \n  setTimeout(() => {\n    window.removeEventListener('scroll', tick);\n    const duration = (Date.now() - begin) / 1000;\n    const rate = (scrollCount / duration).toFixed(1);\n    console.log(`Scroll performance database: Captured ${scrollCount} scrolls in ${duration} seconds (~ ${rate} dispatches/sec).`);\n    alert(`Scroll performance database:\\nEvents captured: ${scrollCount}\\nDuration: ${duration}s\\nRun Rate: ${rate} frames/sec\\n\\n(Rates > 60 reflect highly smooth input processing)`);\n  }, 5000);\n})();"
  },
  {
    "id": "lazy-img-check",
    "name": "Lazy Load Image Auditor",
    "description": "Highlights lazy-loaded image tags and outlines deferred elements visible within the active fold.",
    "category": "responsive_testing",
    "code": "// Image lazy load layout checks\n(function() {\n  const images = document.querySelectorAll('img');\n  let lazyCount = 0; let loadedInView = 0;\n  \n  images.forEach(img => {\n    const isLazy = img.getAttribute('loading') === 'lazy' || img.hasAttribute('data-src');\n    if (isLazy) {\n      lazyCount++;\n      const rect = img.getBoundingClientRect();\n      const inView = (rect.top < window.innerHeight && rect.bottom > 0);\n      if (inView) {\n        img.style.outline = '3px dashed #10B981';\n        loadedInView++;\n      } else {\n        img.style.outline = '3px dashed #EF4444';\n      }\n    }\n  });\n  alert(`found ${lazyCount} deferred lazy elements.\\nLoaded in viewport range: ${loadedInView} (highlighted green outlines)\\nRemaining: ${lazyCount - loadedInView} (highlighted off-screen in red)`);\n})();"
  },
  {
    "id": "inject-jquery-latest",
    "name": "jQuery Injector",
    "description": "Injects production jQuery 3.7.1 from a secure CDN into the window workspace context.",
    "category": "development_utilities",
    "code": "// CDN jQuery Ingestion Script\n(function() {\n  if (window.jQuery) {\n    alert(`jQuery is already injected. Version: ${window.jQuery.fn.jquery}`);\n    return;\n  }\n  const script = document.createElement('script');\n  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';\n  script.onload = () => {\n    console.log('jQuery 3.7.1 mounted successfully: window.jQuery is now ready.');\n    alert('SUCCESS: jQuery version v3.7.1 loaded successfully into the console workspace!');\n  };\n  script.onerror = () => alert('Failed to retrieve script from CDN.');\n  document.head.appendChild(script);\n})();"
  },
  {
    "id": "vue-detector-test",
    "name": "Vue.js Detector",
    "description": "Detects active Vue.js software runtime components on the target page.",
    "category": "development_utilities",
    "code": "// Audit Vue.js runtime indicators\n(function() {\n  const isVue = !!window.Vue || !!document.querySelector('[data-v-app]') || !!document.querySelector('__vue_app__');\n  if (isVue) {\n    alert('SUCCESS: Vue.js architecture detected on page! Initialized elements are ready in sandbox console.');\n  } else {\n    alert('DIAGNOSTICS: No Vue structural elements or global variables detected.');\n  }\n})();"
  },
  {
    "id": "react-detector-test",
    "name": "React Detector",
    "description": "Detects React framework instances by auditing global hooks and component markers.",
    "category": "development_utilities",
    "code": "// Audit React framework indicators\n(function() {\n  const root = document.querySelector('[data-reactroot]') || document.getElementById('root') || document.getElementById('react-root');\n  const isReact = !!window.React || (root && root._reactRootContainer) || (root && Object.keys(root).some(k => k.startsWith('__react')));\n  \n  if (isReact) {\n    alert('React framework instance detected! Single-page application components confirmed.');\n  } else {\n    alert('Diagnostics: React framework root properties were not detected.');\n  }\n})();"
  },
  {
    "id": "remove-all-stylesheets",
    "name": "Strip CSS Stylesheets",
    "description": "Instantly deactivates every CSS file on the document to check raw semantic HTML structure.",
    "category": "development_utilities",
    "code": "// Destroy CSS Stylesheets\n(function() {\n  let stylesCount = 0;\n  document.querySelectorAll('style, link[rel=\"stylesheet\"]').forEach(el => {\n    el.remove();\n    stylesCount++;\n  });\n  document.querySelectorAll('[style]').forEach(el => {\n    el.removeAttribute('style');\n  });\n  console.log(`Cleaned page structural layouts. Removed ${stylesCount} styles sheets.`);\n  alert(`Deactivated ${stylesCount} styling sheets! Raw HTML elements revealed.`);\n})();"
  },
  {
    "id": "disable-all-javascript",
    "name": "Purge Script Code tags",
    "description": "Purges standard script tags and resets event bindings to run offline layout checks.",
    "category": "development_utilities",
    "code": "// Kill JS scripts engines\n(function() {\n  let count = 0;\n  document.querySelectorAll('script').forEach(s => {\n    s.remove();\n    count++;\n  });\n  console.log(`Removed ${count} script tags elements.`);\n  alert(`Removed ${count} script instances from layout context (Refresh page to restore runtime activity).`);\n})();"
  },
  {
    "id": "autofill-mock-data",
    "name": "Form Auto-Filler (QA)",
    "description": "Populates all forms with accurate testing inputs like dummy names, email IDs, passwords, and phones.",
    "category": "development_utilities",
    "code": "// Fast QA inputs simulator auto filler\n(function() {\n  let fieldsFilled = 0;\n  document.querySelectorAll('input, textarea').forEach(el => {\n    if (el.value.trim() !== '') return; // Skip\n    \n    const type = el.getAttribute('type') || 'text';\n    if (type === 'email') el.value = 'sandbox-qa@domain.com';\n    else if (type === 'password') el.value = 'Test_S3curePass!';\n    else if (type === 'tel') el.value = '555-4122';\n    else if (type === 'checkbox' || type === 'radio') el.checked = true;\n    else el.value = 'Jane Doe (Compliance)';\n    \n    // Bubble up input trigger down frameworks bindings\n    el.dispatchEvent(new Event('input', { bubbles: true }));\n    el.dispatchEvent(new Event('change', { bubbles: true }));\n    fieldsFilled++;\n  });\n  alert(`Form Auto-Filler: Evaluated form schema and populated ${fieldsFilled} testing inputs elements!`);\n})();"
  },
  {
    "id": "display-form-metrics",
    "name": "Show All Form Values",
    "description": "Audits and displays active input string configurations nested within your active webpage sheets.",
    "category": "development_utilities",
    "code": "// Form database diagnostics\n(function() {\n  const fieldsValues = [];\n  document.querySelectorAll('input, textarea, select').forEach(el => {\n    const identifier = el.getAttribute('name') || el.className || el.tagName.toLowerCase();\n    const val = el.value || (el.checked ? 'Checked' : '');\n    fieldsValues.push(`${identifier}: \"${val}\"`);\n  });\n  if (fieldsValues.length === 0) {\n    alert('No form fields discovered.');\n    return;\n  }\n  alert(`Exposed Form Fields Map:\\n----------------------\\n${fieldsValues.join('\\n')}`);\n})();"
  },
  {
    "id": "broken-images-alert",
    "name": "Highlight Broken Images",
    "description": "Scans image assets and highlights broken links with a distinct red dashed outline.",
    "category": "development_utilities",
    "code": "// Broken Image Diagnostics\n(function() {\n  let brokenCount = 0;\n  document.querySelectorAll('img').forEach(img => {\n    const isBroken = !img.complete || img.naturalWidth === 0;\n    if (isBroken) {\n      img.style.outline = '4px solid #EF4444';\n      img.style.outlineOffset = '2px';\n      img.style.background = '#FEE2E2';\n      brokenCount++;\n    }\n  });\n  alert(`Quality audits complete. Discovered: ${brokenCount} broken images.`);\n})();"
  },
  {
    "id": "show-alt-text-overlays",
    "name": "Show Image Alt Text",
    "description": "Renders absolute overlay banners on all page layouts displaying raw alt tag strings.",
    "category": "development_utilities",
    "code": "// Visual Alt texts mapping overlays\n(function() {\n  const badges = document.querySelectorAll('.alt-badge-overlay-diag');\n  if (badges.length) {\n    badges.forEach(b => b.remove());\n    console.log('Alt badges cleared.');\n    return;\n  }\n  document.querySelectorAll('img').forEach(img => {\n    const alt = img.getAttribute('alt') || '⚠️ NO ALT ATTRIBUTE';\n    const b = document.createElement('div');\n    b.className = 'alt-badge-overlay-diag';\n    b.textContent = `[Alt]: \"${alt}\"`;\n    b.style.cssText = 'position:absolute;background:rgba(15,23,42,0.9);color:#F1F5F9;padding:4px 6px;font-family:monospace;font-size:10px;z-index:99999;border-radius:3px;border:1px solid #475569';\n    \n    const parent = img.parentNode;\n    if (parent) {\n      if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';\n      parent.appendChild(b);\n    }\n  });\n})();"
  },
  {
    "id": "highlight-missing-alt",
    "name": "Highlight Missing Alt Tags",
    "description": "Highlights any images missing descriptive alt metrics with red dashed borders to check SEO safety compliance.",
    "category": "development_utilities",
    "code": "// Highlight element missing Alt attributes\n(function() {\n  let missingCount = 0;\n  document.querySelectorAll('img').forEach(img => {\n    const missing = !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '';\n    if (missing) {\n      img.style.outline = '4px dashed #EF4444';\n      img.style.outlineOffset = '2.5px';\n      missingCount++;\n    }\n  });\n  alert(`Compliance Audits complete. Found ${missingCount} images missing descriptive alt tags markers.`);\n})();"
  },
  {
    "id": "audit-load-times",
    "name": "Audit Page Load Speeds",
    "description": "Calculates performance timing intervals, displaying total page and DOM ready metrics.",
    "category": "performance_seo",
    "code": "// Read browser performance speed clocks\n(function() {\n  const t = window.performance.timing;\n  const load = (t.loadEventEnd - t.navigationStart) / 1000;\n  const dcl = (t.domContentLoadedEventEnd - t.navigationStart) / 1000;\n  \n  if (load <= 0) {\n    alert('Diagnostics waiting fully loaded resources. Try again in seconds!');\n    return;\n  }\n  alert(`Performance metrics database:\\n-----------------------------\\nDOM Ready Clock: ${dcl.toFixed(3)}s\\nTotal Load clock: ${load.toFixed(3)}s\\n(Speeds under 2s represent high performance standards)`);\n})();"
  },
  {
    "id": "count-page-dom-nodes",
    "name": "Count DOM Elements",
    "description": "Counts total elements, tracking DOM tree depth limits, script references, and container sizing indicators.",
    "category": "performance_seo",
    "code": "// DOM Elements tree audit density\n(function() {\n  const allNodes = document.querySelectorAll('*').length;\n  const scripts = document.querySelectorAll('script').length;\n  const divs = document.querySelectorAll('div').length;\n  const links = document.querySelectorAll('a').length;\n  \n  alert(`DOM Nesting Density Map:\\n-------------------------\\nTotal tag elements: ${allNodes}\\nContainer divs: ${divs}\\nScript variables: ${scripts}\\nLinks: ${links}\\n\\n(DOM counts under 1200 are optimal for rendering performance)`);\n})();"
  },
  {
    "id": "approximate-lcp-metric",
    "name": "Approximate LCP Metric",
    "description": "Fetches browser Largest Contentful Paint timing milestones, checking UX performance.",
    "category": "performance_seo",
    "code": "// Approximate LCP metric parameters\n(function() {\n  const LcpEntries = performance.getEntriesByType('largest-contentful-paint');\n  if (LcpEntries.length === 0) {\n    alert('LCP metrics logging. Move components or refresh.');\n    return;\n  }\n  const primary = LcpEntries[0];\n  const sec = (primary.startTime / 1000).toFixed(3);\n  alert(`Largest Contentful Paint (LCP):\\n-------------------------\\nTiming clock: ${sec} seconds\\nTarget Element: <${primary.element ? primary.element.tagName.toLowerCase() : 'unknown'}>\\n\\n(LCP under 2.5s is optimal for user experience)`);\n})();"
  },
  {
    "id": "cls-layout-shifts",
    "name": "CLS Shifting Metrics",
    "description": "Calculates viewport cumulative layout shifts scores to confirm performance stability.",
    "category": "performance_seo",
    "code": "// Visual shifts metrics index calculator\n(function() {\n  let cls = 0;\n  const entries = performance.getEntriesByType('layout-shift');\n  entries.forEach(e => {\n    if (!e.hadRecentInput) cls += e.value;\n  });\n  \n  let scale = 'Excellent stability (✅ CLASS PASS)';\n  if (cls > 0.25) scale = 'Heavy layout shifts (🚨 POOR)';\n  else if (cls > 0.1) scale = 'Moderate layout shifts (⚠️ NEEDS WORK)';\n  \n  alert(`Cumulative Layout Shift (CLS):\\n-------------------------------\\nCLS computed Score: ${cls.toFixed(5)}\\nRating: ${scale}`);\n})();"
  },
  {
    "id": "extract-seo-metadata",
    "name": "Meta Tags Extractor",
    "description": "Gathers all programmatic meta tags inside developer consoles to analyze description logs and indexing targets.",
    "category": "performance_seo",
    "code": "// SEO meta descriptors inspector\n(function() {\n  const metaElements = [];\n  document.querySelectorAll('meta').forEach(meta => {\n    const name = meta.getAttribute('name') || meta.getAttribute('property') || meta.getAttribute('http-equiv');\n    const content = meta.getAttribute('content');\n    if (name) {\n      metaElements.push(`${name}: \"${content || ''}\"`);\n    }\n  });\n  if (metaElements.length === 0) {\n    alert('No meta descriptors discovered in HTML layouts.');\n    return;\n  }\n  console.log('%cProgrammatic Meta properties matrix:', 'font-size:15px; font-weight:bold; color:#EA580C', metaElements);\n  alert(`Discovered ${metaElements.length} meta fields entries! Logs compiled in developer console.`);\n})();"
  },
  {
    "id": "heading-hierarchy-check",
    "name": "Heading Structure Checker",
    "description": "Exposes structural headings on browser consoles, verifying hierarchy requirements.",
    "category": "performance_seo",
    "code": "// Headings Hierarchy compliance\n(function() {\n  const tree = [];\n  const h1Count = document.querySelectorAll('h1').length;\n  \n  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {\n    tree.push(`${h.tagName}: \"${h.textContent.trim().substring(0, 50)}\"`);\n  });\n  \n  console.log('%cHeading Structure Tree Map:', 'font-size:15px; font-weight:bold; color:#16A34A', tree);\n  \n  let h1Status = '✓ H1 Count correct';\n  if (h1Count === 0) h1Status = '⚠️ CRITICAL: Missing H1 page header!';\n  else if (h1Count > 1) h1Status = '⚠️ WARNING: Multiple H1 headers violate standards!';\n  \n  alert(`Heading Hierarchy Statistics:\\n-------------------------\\nTotal headings nodes: ${tree.length}\\nH1 count status: ${h1Count} (${h1Status})\\n\\nComplete outline cataloged in console prints!`);\n})();"
  },
  {
    "id": "highlight-empty-links",
    "name": "Highlight Empty Links",
    "description": "Identifies and highlights empty anchor tags or links with dummy \"#\" destinations.",
    "category": "performance_seo",
    "code": "// Anchor link integrity checks\n(function() {\n  let countBroken = 0;\n  document.querySelectorAll('a').forEach(a => {\n    const target = a.getAttribute('href');\n    const isBroken = !target || target.trim() === '' || target === '#';\n    if (isBroken) {\n      a.style.outline = '3px solid #EF4444';\n      a.style.outlineOffset = '1.5px';\n      a.style.background = '#FEE2E2';\n      countBroken++;\n    }\n  });\n  alert(`Integrity checks complete. Discovered: ${countBroken} empty placeholder tags.`);\n})();"
  },
  {
    "id": "highlight-external-links",
    "name": "Highlight External Links",
    "description": "Highlights outgoing paths with dashed borders to check linking directions.",
    "category": "performance_seo",
    "code": "// Outcoming linkages analyzer\n(function() {\n  const currentHost = window.location.hostname;\n  let extCount = 0;\n  document.querySelectorAll('a').forEach(link => {\n    if (link.hostname && link.hostname !== currentHost) {\n      link.style.borderBottom = '3px dashed #F59E0B';\n      link.style.color = '#D97706';\n      extCount++;\n    }\n  });\n  alert(`Outgoing Link Diagnostics: Discovered ${extCount} external links elements. Marked with gold dashed styling.`);\n})();"
  },
  {
    "id": "google-serp-preview",
    "name": "SEO Google SERP Snippet Preview",
    "description": "Renders an interactive Google Search result preview of the active page metadata structures.",
    "category": "performance_seo",
    "code": "// Google Search engine results preview card\n(function() {\n  const d = document;\n  const old = d.getElementById('serp-preview-card'); if (old) old.remove();\n  const desc = d.querySelector('meta[name=\"description\"]')?.content || '⚠️ DESCRIPTION MISSING: Configure <meta name=\"description\"> to optimize search results.';\n  const b = d.createElement('div');\n  b.id = 'serp-preview-card';\n  b.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#FFFFFF;border:1px solid #dadce0;padding:24px;z-index:999999;max-width:600px;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.25);text-align:left;font-family:Arial,sans-serif';\n  b.innerHTML = `\n    <div style=\"font-size:12px;color:#202124;font-weight:bold;margin-bottom:12px;text-transform:uppercase\">SERP Snippet emulation</div>\n    <div style=\"color:#202124;font-size:14px;margin-bottom:4px;display:flex;align-items:center\">google.com/search?q=preview</div>\n    <h3 style=\"color:#1a0dab;font-size:20px;margin:0 0 4px;font-weight:normal;line-height:1.3;text-decoration:none\">${d.title}</h3>\n    <div style=\"color:#202124;font-size:14px;margin-bottom:6px;word-break:break-all\">${window.location.href}</div>\n    <div style=\"color:#4d5156;font-size:14px;line-height:1.58;word-break:break-word\">${desc}</div>\n    <button onclick=\"this.parentElement.remove()\" style=\"margin-top:16px;padding:6px 16px;background:#1A73E8;color:white;border:none;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold\">Close Dialog</button>\n  `;\n  d.body.appendChild(b);\n})();"
  },
  {
    "id": "web-vitals-box",
    "name": "Vitals Speed Summary",
    "description": "Compiles LCP speeds, FCP clocks, and layout shifts variables into a speed dial visualizer panel.",
    "category": "performance_seo",
    "code": "// Core Web Vitals speed indicators card\n(function() {\n  const d = document;\n  const old = d.getElementById('vitals-widget-summary'); if (old) old.remove();\n  \n  const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;\n  const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 1500;\n  let cls = 0;\n  performance.getEntriesByType('layout-shift').forEach(e => { if(!e.hadRecentInput) cls += e.value; });\n  \n  const b = d.createElement('div');\n  b.id = 'vitals-widget-summary';\n  b.style = 'position:fixed;top:15px;right:15px;background:#0F172A;color:#E2E8F0;border:1px solid #334155;padding:16.5px;z-index:999999;font-family:monospace;border-radius:8px;box-shadow:0 12px 15px -3px rgba(0,0,0,0.40)';\n  \n  b.innerHTML = `\n    <h3 style=\"margin:0 0 10px;font-size:12px;font-weight:bold;color:#10B981;border-bottom:1px solid #334155;padding-bottom:4px\">Core Web Vitals summary</h3>\n    <div style=\"margin:4px 0;font-size:10px;display:flex;justify-content:space-between;gap:40px\"><span>FCP (Content load):</span> <b style=\"color:${fcp < 2000 ? '#10B981' : '#EF4444'}\">${(fcp/1000).toFixed(3)}s</b></div>\n    <div style=\"margin:4px 0;font-size:10px;display:flex;justify-content:space-between;gap:40px\"><span>LCP (Render frame):</span> <b style=\"color:${lcp < 2500 ? '#10B981' : '#F59E0B'}\">${(lcp/1000).toFixed(3)}s</b></div>\n    <div style=\"margin:4px 0;font-size:10px;display:flex;justify-content:space-between;gap:40px\"><span>CLS (Stability):</span> <b style=\"color:${cls < 0.1 ? '#10B981' : '#EF4444'}\">${cls.toFixed(4)}</b></div>\n    <button onclick=\"this.parentElement.remove()\" style=\"margin-top:10.5px;width:100%;padding:4px;border-radius:4px;background:#1E293B;color:#94A3B8;border:1px solid #334155;cursor:pointer;font-family:monospace;font-size:10px;font-weight:bold\">Dismiss Panel</button>\n  `;\n  d.body.appendChild(b);\n})();"
  },
  {
    "id": "computed-rules-calculator",
    "name": "CSS Specificity Calculator",
    "description": "Finds, analyses, and lists Computed CSS specificity variables across screen margins.",
    "category": "advanced_tools",
    "code": "// Target styling structure inspector\n(function() {\n  const handler = function(e) {\n    const el = e.target;\n    if (el) {\n      console.log(`%cSelected Element styling rules outline: <${el.tagName.toLowerCase()}>`, 'font-size:14px; font-weight:bold; color:#7C3AED');\n      console.log('ID parameter present:', !!el.id, `(\"${el.id || ''}\")`);\n      console.log('Classes count:', el.classList.length, Array.from(el.classList));\n      console.log('Active parent scope:', el.parentNode);\n      \n      const computed = getComputedStyle(el);\n      console.log('Primary width allocations:', computed.width, 'height:', computed.height);\n      alert(`Target Spec properties logged in Console! Tag: <${el.tagName.toLowerCase()}> Classes list has size ${el.classList.length}.`);\n      document.removeEventListener('click', handler);\n    }\n    e.preventDefault();\n  };\n  document.addEventListener('click', handler);\n  alert('CSS Specificity helper enabled: click any element.');\n})();"
  },
  {
    "id": "fps-meter-audits",
    "name": "FPS Animation Meter",
    "description": "Runs real-time hardware-accelerated FPS rendering calculations inside viewport monitors.",
    "category": "advanced_tools",
    "code": "// Viewport FPS Performance monitor\n(function() {\n  const panelId = 'fps-meter-panel';\n  const existing = document.getElementById(panelId);\n  if (existing) {\n    existing.remove();\n    cancelAnimationFrame(window.fpsFrameLoop);\n    console.log('FPS analyzer closed.');\n    return;\n  }\n  const panel = document.createElement('div');\n  panel.id = panelId;\n  panel.style.cssText = 'position:fixed;top:16px;right:16px;background:rgba(15,23,42,0.95);border:1px solid #10B981;color:#10B981;padding:8px 12px;font-family:monospace;font-size:12px;font-weight:bold;z-index:999999;border-radius:6px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3)';\n  document.body.appendChild(panel);\n  \n  let frames = 0; let lastTrigger = Date.now();\n  window.fpsFrameLoop = function() {\n    frames++;\n    const now = Date.now();\n    if (now - lastTrigger >= 1000) {\n      panel.textContent = `Performance: ${frames} FPS`;\n      frames = 0;\n      lastTrigger = now;\n    }\n    requestAnimationFrame(window.fpsFrameLoop);\n  };\n  window.fpsFrameLoop();\n  console.log('FPS frame counter loop launched.');\n})();"
  },
  {
    "id": "memory-heap-meters",
    "name": "JavaScript Memory Heap",
    "description": "Calculates JS Heap allocation scopes using internal browser performance memory trackers.",
    "category": "advanced_tools",
    "code": "// Memory heap diagnostics\n(function() {\n  const m = performance.memory;\n  if (!m) {\n    alert('Diagnostics require Chrome browser with precise memory indicators turned on.');\n    return;\n  }\n  const used = (m.usedJSHeapSize / 1048576).toFixed(2);\n  const total = (m.totalJSHeapSize / 1048576).toFixed(2);\n  const limit = (m.jsHeapSizeLimit / 1048576).toFixed(2);\n  \n  alert(`JS heap memory allocation metrics:\\n------------------------------------\\nUsed: ${used} MB\\nTotal: ${total} MB\\nLimit: ${limit} MB\\n\\n(Memory stays efficient under 50MB for standard apps)`);\n})();"
  },
  {
    "id": "find-duplicated-element-id",
    "name": "Find Duplicate IDs",
    "description": "Scans DOM element attributes and logs duplicate identifier IDs that conflict with semantic layout rules.",
    "category": "advanced_tools",
    "code": "// DOM Identifiers uniqueness validator\n(function() {\n  const idMap = {};\n  const duplicateList = [];\n  document.querySelectorAll('[id]').forEach(el => {\n    const idValue = el.id;\n    if (idMap[idValue]) {\n      duplicateList.push(idValue);\n    }\n    idMap[idValue] = true;\n  });\n  \n  const uniques = [...new Set(duplicateList)];\n  if (uniques.length === 0) {\n    alert('SUCCESS: No duplicate ID properties discovered inside the page layout!');\n  } else {\n    alert(`CRITICAL INVALID MARKUP DETECTED: Found ${uniques.length} duplicate IDs! Check compiler console for logs.`);\n    console.log('Duplicate IDs found:', uniques);\n  }\n})();"
  },
  {
    "id": "aria-attribute-checks",
    "name": "ARIA Roles Validator",
    "description": "Highlights elements containing custom ARIA attributes to verify screen-reader support features.",
    "category": "advanced_tools",
    "code": "// Accessible ARIA indicators highlighter\n(function() {\n  let count = 0;\n  document.querySelectorAll('[role], [aria-label], [aria-hidden], [aria-expanded]').forEach(el => {\n    el.style.outline = '3.5px dashed #9C27B0';\n    el.style.outlineOffset = '2px';\n    count++;\n  });\n  alert(`Found ${count} elements containing ARIA accessibility attributes. Marked elements are now highlighted in purple.`);\n})();"
  },
  {
    "id": "keyboard-focus-capsule",
    "name": "A11y Tab-Focus Auditor",
    "description": "Lists all focusable tags and monitors tab-key focus traps.",
    "category": "advanced_tools",
    "code": "// audit focus tree alignments\n(function() {\n  const elements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');\n  const focusables = Array.from(elements).filter(el => el.tabIndex > -1 && el.offsetParent !== null);\n  \n  if (focusables.length === 0) {\n    alert('No keyboard interactive objects discovered inside layout boundaries.');\n    return;\n  }\n  console.log('Focus elements in tab order:', focusables);\n  alert(`Keyboard tab-focus database: discovered ${focusables.length} focusable page elements! Tab order details printed in console.`);\n})();"
  },
  {
    "id": "cookie-banner-audits",
    "name": "GDPR Cookie Banner Finder",
    "description": "Detects and flags potential cookie consent container elements.",
    "category": "advanced_tools",
    "code": "// Identify GDPR notice elements\n(function() {\n  const triggers = ['cookie', 'consent', 'gdpr', 'privacy', 'policy', 'banner'];\n  let count = 0;\n  document.querySelectorAll('div, section, aside').forEach(el => {\n    const text = (el.textContent || '').toLowerCase();\n    const matches = triggers.some(t => text.includes(t));\n    const isFloatingNotice = el.offsetHeight > 30 && el.offsetHeight < 320;\n    \n    if (matches && isFloatingNotice && !el.id.includes('devtools')) {\n      el.style.border = '4px dashed #8B5CF6';\n      el.style.background = 'rgba(139, 92, 246, 0.05)';\n      count++;\n    }\n  });\n  alert(`GDPR diagnostics completed! Flagged ${count} floating cookie banners layers elements.`);\n})();"
  },
  {
    "id": "scrollbar-width-measurer",
    "name": "Audit Scrollbar Widths",
    "description": "Determines screen layout scrollbar offsets in absolute pixels.",
    "category": "advanced_tools",
    "code": "// Scrollbars width calculator\n(function() {\n  const outer = document.createElement('div');\n  outer.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px; visibility: hidden;';\n  document.body.appendChild(outer);\n  \n  const width = outer.offsetWidth - outer.clientWidth;\n  outer.remove();\n  \n  console.log('Calculated system scrollbar width allocations:', width, 'px');\n  alert(`Internal Sizing: scrollbar handles width is ${width}px (Offsets are fully aligned in grid calculation rules).`);\n})();"
  },
  {
    "id": "http-incoming-headers",
    "name": "HTTP Response Headers",
    "description": "Submits a silent HEAD call to log incoming web page server headers.",
    "category": "advanced_tools",
    "code": "// HTTP Host response properties auditor\n(function() {\n  fetch(window.location.href, { method: 'HEAD' })\n    .then(res => {\n      console.log('%cHTTP Response Headers:', 'font-size:15px; font-weight:bold; color:#7C3AED');\n      const container = {};\n      res.headers.forEach((val, key) => {\n        container[key] = val;\n        console.log(`${key}: ${val}`);\n      });\n      console.table(container);\n      alert('SUCCESS: HTTP Headers fetched and printed inside developer console table!');\n    })\n    .catch(err => {\n      console.error('Fetch errors logged:', err);\n      alert('DIAGNOSTIC NOTICE: Same-Origin CORS policies blocked headers reading. Check Network logs instead.');\n    });\n})();"
  },
  {
    "id": "export-active-markdown",
    "name": "Export Layout as Markdown",
    "description": "Parses headings and paragraphs into standard formatted Markdown text inside console logs.",
    "category": "advanced_tools",
    "code": "// Dynamic DOM content writer to Markdown converter\n(function() {\n  let markdown = '';\n  document.querySelectorAll('h1, h2, h3, h4, p, li').forEach(el => {\n    const text = el.textContent.trim();\n    if (text === '') return;\n    \n    const tag = el.tagName.toLowerCase();\n    if (tag === 'h1') markdown += `# ${text}\\n\\n`;\n    else if (tag === 'h2') markdown += `## ${text}\\n\\n`;\n    else if (tag === 'h3') markdown += `### ${text}\\n\\n`;\n    else if (tag === 'li') markdown += `- ${text}\\n`;\n    else markdown += `${text}\\n\\n`;\n  });\n  \n  console.log('%cConverted Page Markdown Bundle:', 'font-size:15px; font-weight:bold; color:#10B981');\n  console.log(markdown);\n  alert('SUCCESS: Clean Markdown exported directly to developer console!');\n})();"
  },
  {
    "id": "alt-text-audit",
    "name": "Image Alt Text Audit",
    "description": "Finds and highlights all images on the page, overlaying red borders on those missing descriptive alt attributes.",
    "category": "performance_seo",
    "code": "// Visual alt text checker and highlighter\n(function() {\n  const imgs = document.querySelectorAll('img');\n  let missingCount = 0;\n  imgs.forEach(img => {\n    if (!img.alt || img.alt.trim() === '') {\n      img.style.outline = '3px dashed #ef4444';\n      img.style.outlineOffset = '2px';\n      missingCount++;\n      console.warn('Missing ALT tag for image:', img.src);\n    } else {\n      img.style.outline = '3px dashed #10b981';\n      img.style.outlineOffset = '2px';\n    }\n  });\n  console.log(`Alt text check complete: ${missingCount} missing, ${imgs.length - missingCount} present.`);\n  alert(`Alt Text Audit Completed!\\nImages missing alt text: ${missingCount}\\nImages with alt text: ${imgs.length - missingCount}`);\n})();"
  },
  {
    "id": "convert-to-grayscale",
    "name": "Grayscale Contrast Mode",
    "description": "Toggles the whole document to monochrome grayscale to review design visual weights, focal points, and readability contrast ratios.",
    "category": "design_layout",
    "code": "// Toggle Grayscale filter on html element\n(function() {\n  const existing = document.getElementById('grayscale-bookmarklet-style');\n  if (existing) {\n    existing.remove();\n    console.log('Grayscale color mode deactivated.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'grayscale-bookmarklet-style';\n    s.textContent = 'html { filter: grayscale(100%) !important; }';\n    document.head.appendChild(s);\n    console.log('Grayscale contrast mode activated. Visual balance is now easier to audit.');\n  }\n})();"
  },
  {
    "id": "form-auto-filler",
    "name": "Form Mock Auto-Filler",
    "description": "Populates all visible form inputs, checkboxes, and select dropdowns with clean randomized placeholder test data.",
    "category": "development_utilities",
    "code": "// Fills all form elements with mock inputs and dispatches change events\n(function() {\n  const elements = document.querySelectorAll('input, textarea, select');\n  let filledCount = 0;\n  elements.forEach(el => {\n    if (el.offsetParent === null) return; // Ignore hidden elements\n    const tag = el.tagName.toLowerCase();\n    const type = (el.getAttribute('type') || 'text').toLowerCase();\n    \n    if (tag === 'textarea') {\n      el.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';\n      filledCount++;\n    } else if (tag === 'select') {\n      if (el.options.length > 1) {\n        el.selectedIndex = 1;\n        filledCount++;\n      }\n    } else if (type === 'checkbox' || type === 'radio') {\n      el.checked = true;\n      filledCount++;\n    } else if (type === 'email') {\n      el.value = `dev.test${Math.floor(Math.random() * 10000)}@example.com`;\n      filledCount++;\n    } else if (type === 'number') {\n      el.value = Math.floor(Math.random() * 100) + 1;\n      filledCount++;\n    } else if (type === 'tel') {\n      el.value = '555-019-' + Math.floor(1000 + Math.random() * 9000);\n      filledCount++;\n    } else if (type === 'text') {\n      el.value = 'Sandbox User ' + Math.floor(Math.random() * 100);\n      filledCount++;\n    }\n    \n    // Dispatch events to satisfy framework listeners (React, Vue, etc.)\n    el.dispatchEvent(new Event('input', { bubbles: true }));\n    el.dispatchEvent(new Event('change', { bubbles: true }));\n  });\n  console.log(`Form Filler successfully populated ${filledCount} form elements.`);\n  alert(`Form mock auto-filler complete! Populated ${filledCount} form fields.`);\n})();"
  },
  {
    "id": "reveal-password-fields",
    "name": "Reveal Password Fields",
    "description": "Swaps input type=\"password\" tags with regular text fields to temporarily expose hidden characters during sign-in verification.",
    "category": "development_utilities",
    "code": "// Reveal hidden inputs type=\"password\" to standard text\n(function() {\n  const fields = document.querySelectorAll('input[type=\"password\"]');\n  fields.forEach(f => {\n    f.setAttribute('type', 'text');\n    f.style.border = '2px solid #ef4444';\n  });\n  console.log(`Exposed ${fields.length} password field inputs.`);\n  alert(`Exposed ${fields.length} hidden password fields safely.`);\n})();"
  },
  {
    "id": "clear-browser-cache",
    "name": "Purge Storage & Session",
    "description": "Instantly sweeps local storage, session storage, and logs details in console to reset cookies & application state.",
    "category": "advanced_tools",
    "code": "// Purge client-side key-value cache storages\n(function() {\n  localStorage.clear();\n  sessionStorage.clear();\n  console.log('%cPurge Completed:', 'font-size:14px; font-weight:bold; color:#ef4444');\n  console.log('Local Storage cleared.\\nSession Storage cleared.');\n  alert('Purged Storage Cache:\\n---------------------\\nLocal Storage and Session Storage cleared successfully!');\n})();"
  },
  {
    "id": "page-outliner-interactive",
    "name": "Structural Elements Outline",
    "description": "Visualizes the page structure by drawing subtle outline grids on standard semantic tags like header, nav, main, footer, and sections.",
    "category": "design_layout",
    "code": "// Outline HTML5 semantic sections with distinctive colors\n(function() {\n  const existing = document.getElementById('semantic-outliner-style');\n  if (existing) {\n    existing.remove();\n    console.log('Semantic structural outliner off.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'semantic-outliner-style';\n    s.textContent = `\n      header { outline: 2px solid #3b82f6 !important; outline-offset: -2px !important; }\n      nav { outline: 2px solid #10b981 !important; outline-offset: -2px !important; }\n      main { outline: 2px solid #8b5cf6 !important; outline-offset: -2px !important; }\n      section { outline: 2px dashed #f59e0b !important; outline-offset: -2px !important; }\n      footer { outline: 2px solid #ec4899 !important; outline-offset: -2px !important; }\n    `;\n    document.head.appendChild(s);\n    console.log('Semantic structural outliner on! Blue: Header, Green: Nav, Purple: Main, Orange: Section, Pink: Footer.');\n  }\n})();"
  },
  {
    "id": "view-dns-records",
    "name": "View DNS Records",
    "description": "Redirects the current domain to nslookup.io to audit DNS records, MX configurations, and IP nameservers instantly.",
    "category": "advanced_tools",
    "code": "// Redirect to nslookup.io DNS toolset\n(function() {\n  const host = window.location.hostname;\n  if (host && host !== 'localhost' && host !== '127.0.0.1') {\n    window.open(`https://www.nslookup.io/domains/${host}/dns-records/`, '_blank');\n    console.log(`Opened DNS lookup for domain: ${host}`);\n  } else {\n    alert('Please run this bookmarklet on a live website with a valid domain.');\n  }\n})();"
  },
  {
    "id": "view-source",
    "name": "View Source",
    "description": "Opens the view-source representation of the current active page in a new tab.",
    "category": "development_utilities",
    "code": "// Open view-source of current page\n(function() {\n  window.open('view-source:' + window.location.href, '_blank');\n  console.log('Opened view-source of current tab.');\n})();"
  },
  {
    "id": "check-all-checkboxes",
    "name": "Check All Checkboxes",
    "description": "Finds and selects all checkboxes on the active page instantly.",
    "category": "development_utilities",
    "code": "// Check all checkbox inputs\n(function() {\n  const boxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  boxes.forEach(b => {\n    b.checked = true;\n    b.dispatchEvent(new Event('change', { bubbles: true }));\n  });\n  console.log(`Checked ${boxes.length} checkbox inputs.`);\n  alert(`Checked ${boxes.length} checkbox inputs.`);\n})();"
  },
  {
    "id": "uncheck-all-checkboxes",
    "name": "Uncheck All Checkboxes",
    "description": "Finds and unselects all checkboxes on the active page instantly.",
    "category": "development_utilities",
    "code": "// Uncheck all checkbox inputs\n(function() {\n  const boxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  boxes.forEach(b => {\n    b.checked = false;\n    b.dispatchEvent(new Event('change', { bubbles: true }));\n  });\n  console.log(`Unchecked ${boxes.length} checkbox inputs.`);\n  alert(`Unchecked ${boxes.length} checkbox inputs.`);\n})();"
  },
  {
    "id": "disable-all-styles",
    "name": "Disable All Styles",
    "description": "Deactivates all linked stylesheets and internal styles to test layout semantic readability without CSS.",
    "category": "design_layout",
    "code": "// Disable all linked & embedded stylesheets\n(function() {\n  for (let i = 0; i < document.styleSheets.length; i++) {\n    document.styleSheets[i].disabled = true;\n  }\n  const inline = document.querySelectorAll('style, [style]');\n  inline.forEach(el => {\n    if (el.tagName === 'STYLE') {\n      (el as HTMLStyleElement).disabled = true;\n    } else {\n      el.removeAttribute('style');\n    }\n  });\n  console.log('All page styles disabled.');\n  alert('All linked and inline styles disabled!');\n})();"
  },
  {
    "id": "display-hidden-elements",
    "name": "Reveal Hidden Elements",
    "description": "Forces all hidden components (display: none, visibility: hidden, opacity: 0) to be shown with outlines.",
    "category": "design_layout",
    "code": "// Force reveal all hidden elements on page\n(function() {\n  const existing = document.getElementById('reveal-hidden-style');\n  if (existing) {\n    existing.remove();\n    console.log('Reveal hidden elements deactivated.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'reveal-hidden-style';\n    s.textContent = '[hidden], [style*=\"display: none\"], [style*=\"visibility: hidden\"], [style*=\"opacity: 0\"] { display: block !important; visibility: visible !important; opacity: 1 !important; outline: 2px dashed #f59e0b !important; outline-offset: -2px !important; }';\n    document.head.appendChild(s);\n    console.log('Reveal hidden elements activated. Outlined in orange dashed lines.');\n  }\n})();"
  },
  {
    "id": "outline-external-links",
    "name": "Outline External Links",
    "description": "Highlights all hyperlinks pointing to external websites with a distinct outline.",
    "category": "performance_seo",
    "code": "// Outline external hyperlink elements\n(function() {\n  const existing = document.getElementById('outline-external-links-style');\n  if (existing) {\n    existing.remove();\n    console.log('Outline external links deactivated.');\n  } else {\n    const s = document.createElement('style');\n    s.id = 'outline-external-links-style';\n    s.textContent = `a[href*=\"//\"]:not([href*=\"${window.location.hostname}\"]){outline:2px solid #ef4444!important;outline-offset:2px!important;background-color:rgba(239,72,153,0.15)!important}`;\n    document.head.appendChild(s);\n    console.log('Outline external links activated. Marked with a red outline.');\n  }\n})();"
  },
  {
    "id": "design-mode",
    "name": "Design Mode Editor",
    "description": "Enables or disables browser contentEditable design mode to let you edit any text on the page in-place.",
    "category": "development_utilities",
    "code": "// Toggle Document Design Mode contentEditable\n(function() {\n  const d = document;\n  if (d.body.contentEditable === 'true' || d.designMode === 'on') {\n    d.body.contentEditable = 'false';\n    d.designMode = 'off';\n    console.log('Design mode turned OFF.');\n    alert('Design mode: OFF (web page is now read-only)');\n  } else {\n    d.body.contentEditable = 'true';\n    d.designMode = 'on';\n    console.log('Design mode turned ON.');\n    alert('Design mode: ON (you can now edit any text directly!)');\n  }\n})();"
  },
  {
    "id": "reveal-passwords-quick",
    "name": "Quick Password Revealer",
    "description": "Exposes password inputs as standard visible text to check spelling or verify saved login forms.",
    "category": "development_utilities",
    "code": "// Reveal all password input types\n(function() {\n  const inputs = document.querySelectorAll('input[type=\"password\"]');\n  inputs.forEach(i => {\n    i.type = \"text\";\n  });\n  console.log(`Revealed ${inputs.length} password fields.`);\n  alert(`Revealed ${inputs.length} password fields!`);\n})();"
  },
  {
    "id": "element-zapper",
    "name": "Element Zapper",
    "description": "Click any component to completely delete it from the DOM layout to test responsive reflows or remove overlay blockers.",
    "category": "development_utilities",
    "code": "// Zap and destroy hovered DOM element on click\n(function() {\n  const styleId = 'zap-element-style';\n  const style = document.getElementById(styleId);\n  if (style) {\n    style.remove();\n    document.querySelectorAll('.zap-hover').forEach(el => el.classList.remove('zap-hover'));\n    document.removeEventListener('click', window.zapClick);\n    document.removeEventListener('mouseover', window.zapOver);\n    document.removeEventListener('mouseout', window.zapOut);\n    console.log('Element zapper deactivated.');\n    alert('Element zapper deactivated.');\n    return;\n  }\n  const s = document.createElement('style');\n  s.id = styleId;\n  s.textContent = '.zap-hover{outline:2px dashed #ef4444!important;cursor:crosshair!important}';\n  document.head.appendChild(s);\n  \n  window.zapOver = function(e) {\n    if (e.target) e.target.classList.add('zap-hover');\n  };\n  window.zapOut = function(e) {\n    if (e.target) e.target.classList.remove('zap-hover');\n  };\n  window.zapClick = function(e) {\n    if (e.target) {\n      e.preventDefault();\n      e.stopPropagation();\n      const name = e.target.tagName.toLowerCase();\n      e.target.remove();\n      console.log(`Zapped and removed element: <${name}>`);\n    }\n  };\n  \n  document.addEventListener('mouseover', window.zapOver);\n  document.addEventListener('mouseout', window.zapOut);\n  document.addEventListener('click', window.zapClick, { capture: true });\n  console.log('Element zapper active. Click any layout element to remove it.');\n  alert('Element zapper activated. Hover and click any element to delete it.');\n})();"
  },
  {
    "id": "qr-code-generator",
    "name": "Generate Page QR Code",
    "description": "Renders a popup QR Code of the current URL to quickly load and test the webpage on mobile devices.",
    "category": "responsive_testing",
    "code": "// Generate and display page QR code\n(function() {\n  const url = window.location.href;\n  window.open('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(url), '_blank');\n  console.log('Generated QR code page for testing mobile layout.');\n})();"
  },
  {
    "id": "wayback-machine",
    "name": "Wayback Machine Lookup",
    "description": "Queries the Internet Archive Wayback Machine history logs for the current URL to inspect historical versions.",
    "category": "performance_seo",
    "code": "// Lookup page URL on Internet Archive Wayback Machine\n(function() {\n  const url = window.location.href;\n  window.open('https://web.archive.org/web/*/' + url, '_blank');\n  console.log('Opening Wayback Machine history timeline logs.');\n})();"
  },
  {
    "id": "pagespeed-insights",
    "name": "Google PageSpeed Auditor",
    "description": "Launches Google PageSpeed Insights analyzer in a new tab to run a live Core Web Vitals audit on the current URL.",
    "category": "performance_seo",
    "code": "// Open PageSpeed Insights auditor\n(function() {\n  const url = window.location.href;\n  window.open('https://pagespeed.web.dev/analysis?url=' + encodeURIComponent(url), '_blank');\n  console.log('Launched Google PageSpeed Insights web performance auditor.');\n})();"
  },
  {
    "id": "extract-all-images",
    "name": "Extract Page Images",
    "description": "Gathers all images on the current webpage and displays them in a clean, downloadable grid panel in a new tab.",
    "category": "advanced_tools",
    "code": "// Extract and load all active images into a visual gallery tab\n(function() {\n  const imgs = document.querySelectorAll('img');\n  if (imgs.length === 0) {\n    alert('No images found on this page.');\n    return;\n  }\n  const w = window.open();\n  if (!w) {\n    alert('Popup blocked by browser! Please enable popup windows to view image extractor.');\n    return;\n  }\n  w.document.write('<html><head><title>Extracted Images</title><style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;padding:24px}h1{font-size:20px}img{max-width:200px;max-height:200px;margin:8px;border:2px solid #334155;border-radius:6px;transition:transform 0.2s}img:hover{transform:scale(1.1);border-color:#3b82f6}</style></head><body><h1>Extracted Images ('+imgs.length+')</h1><div style=\"display:flex;flex-wrap:wrap\">');\n  imgs.forEach(img => {\n    if (img.src) w.document.write('<a href=\"'+img.src+'\" target=\"_blank\"><img src=\"'+img.src+'\" title=\"'+img.src+'\" referrerPolicy=\"no-referrer\"/></a>')\n  });\n  w.document.write('</div></body></html>');\n  w.document.close();\n  console.log(`Extracted ${imgs.length} image elements from the page.`);\n})();"
  },
  {
    "id": "w3c-html-validation",
    "name": "Validate HTML (W3C)",
    "description": "Directly sends the current URL to the official W3C Markup Validation Service to audit HTML validity and tags matching.",
    "category": "performance_seo",
    "code": "// Trigger W3C HTML validator\n(function() {\n  window.open('https://validator.w3.org/nu/?doc=' + encodeURIComponent(window.location.href), '_blank');\n  console.log('Opening official W3C Nu HTML Markup Validator for current URL.');\n})();"
  },
  {
    "id": "w3c-css-validation",
    "name": "Validate CSS (W3C)",
    "description": "Directly sends the current URL to the official W3C CSS Validation Service to audit CSS compliance and syntax errors.",
    "category": "performance_seo",
    "code": "// Trigger W3C CSS validator\n(function() {\n  window.open('https://jigsaw.w3.org/css-validator/validator?uri=' + encodeURIComponent(window.location.href), '_blank');\n  console.log('Opening official W3C CSS Jigsaw validator for current URL.');\n})();"
  },
  {
    "id": "clear-domain-cookies",
    "name": "Clear Domain Cookies",
    "description": "Sweeps all cookie storage of the current domain to reset sessions and debug fresh load parameters.",
    "category": "advanced_tools",
    "code": "// Purge current host cookies\n(function() {\n  const cookies = document.cookie.split(';');\n  for (let i = 0; i < cookies.length; i++) {\n    const cookie = cookies[i];\n    const eqPos = cookie.indexOf('=');\n    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;\n    document.cookie = name.trim() + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';\n  }\n  console.log(`Purged cookies on host: ${window.location.hostname}`);\n  alert(`Attempted to clear cookies for ${window.location.hostname} successfully!`);\n})();"
  },
  {
    "id": "text-word-counter",
    "name": "Word & Selection Counter",
    "description": "Returns precise character & word counts of either selected text or the entire page text content.",
    "category": "development_utilities",
    "code": "// Retrieve text metrics\n(function() {\n  const selection = window.getSelection().toString();\n  const text = selection || document.body.innerText;\n  const sourceLabel = selection ? \"Selection text\" : \"Full Page body text\";\n  const charCount = text.length;\n  const wordCount = text.trim().split(/\\s+/).filter(Boolean).length;\n  alert(`Metrics [${sourceLabel}]:\\n---------------------\\nWords: ${wordCount}\\nCharacters: ${charCount}`);\n  console.log(`Word count: ${wordCount} | Character count: ${charCount}`);\n})();"
  },
  {
    "id": "aria-roles-auditor",
    "name": "Aria Roles Auditor",
    "description": "Highlights and tags all ARIA roles, alt text, and accessibility properties on elements to audit assistive readers compliance.",
    "category": "performance_seo",
    "code": "// Accessibility tags & Aria audit\n(function() {\n  const styleId = 'aria-roles-style';\n  const existing = document.getElementById(styleId);\n  if (existing) {\n    existing.remove();\n    document.querySelectorAll('.aria-badge').forEach(badge => badge.remove());\n    console.log('Aria tags off.');\n    return;\n  }\n  const s = document.createElement('style');\n  s.id = styleId;\n  s.textContent = '.aria-badge{background:#8b5cf6!important;color:#fff!important;font:bold 9px monospace!important;padding:2px 4px!important;border-radius:3px!important;margin-left:4px!important;display:inline-block!important;z-index:99999!important}';\n  document.head.appendChild(s);\n  \n  const els = document.querySelectorAll('[role], [aria-label], [aria-hidden], img[alt]');\n  els.forEach(el => {\n    const label = el.getAttribute('role') || el.getAttribute('aria-label') || 'alt: ' + el.getAttribute('alt');\n    const span = document.createElement('span');\n    span.className = 'aria-badge';\n    span.innerText = label;\n    el.appendChild(span);\n  });\n  console.log(`Tagged ${els.length} accessible elements.`);\n  alert('Aria and Accessibility elements highlighted!');\n})();"
  },
  {
    "id": "sec-wp-version",
    "name": "WordPress Version Detector",
    "description": "Detects the active WordPress core release version from page metadata and page stylesheets.",
    "category": "penetration_testing",
    "code": "// WordPress Core version auditor\n(function() {\n  var v = '';\n  var m = document.querySelector('meta[name=\"generator\"]');\n  if (m && m.content.toLowerCase().includes('wordpress')) {\n    var mt = m.content.match(/[\\d.]+/);\n    if (mt) v = mt[0];\n  }\n  var l = document.querySelector('link[rel=\"stylesheet\"]');\n  if (!v && l) {\n    var mt2 = l.href.match(/ver=([\\d.]+)/);\n    if (mt2) v = mt2[1];\n  }\n  if (v) {\n    alert('WordPress Version: ' + v);\n    console.log('WordPress version detected:', v);\n  } else {\n    alert('WordPress version not detected.');\n    console.log('No wordpress version found in metadata or styles.');\n  }\n})();"
  },
  {
    "id": "sec-unmask-password",
    "name": "Unmask Password Inputs",
    "description": "Converts all password fields into plain editable text to easily reveal obscured values during testing.",
    "category": "penetration_testing",
    "code": "// Unmask Hidden Password Inputs\n(function() {\n  var p = document.querySelectorAll('input[type=\"password\"]');\n  if (p.length === 0) {\n    alert('No password fields found on this page.');\n    console.log('Audit: No password inputs detected.');\n  } else {\n    p.forEach(function(el) {\n      el.type = 'text';\n    });\n    alert('Unmasked ' + p.length + ' password input(s).');\n    console.log('Audit: Unmasked ' + p.length + ' password fields successfully.');\n  }\n})();"
  },
  {
    "id": "sec-cookie-monster",
    "name": "Cookie Monster Resolver",
    "description": "Inspects, lists, and provides options to clear individual cookies for the current domain name.",
    "category": "penetration_testing",
    "code": "// Audit and inspect host cookies\n(function() {\n  var cookies = document.cookie.split(';');\n  if (cookies.length === 0 || (cookies.length === 1 && cookies[0] === '')) {\n    alert('No cookies found for this host.');\n    console.log('No active cookies detected on this site.');\n  } else {\n    var list = [];\n    cookies.forEach(function(c) {\n      var parts = c.split('=');\n      list.push(parts[0].trim() + ': ' + (parts[1] || '').trim());\n    });\n    alert('Cookies found (' + list.length + '):\\n\\n' + list.join('\\n'));\n    console.log('Active Cookies Catalog:', list);\n  }\n})();"
  },
  {
    "id": "sec-show-hidden",
    "name": "Show Hidden Elements",
    "description": "Forces visibility of all hidden elements, display:none, visibility:hidden, or opacity:0 on the page.",
    "category": "penetration_testing",
    "code": "// Reveal hidden elements inside the DOM\n(function() {\n  var el = document.querySelectorAll('*');\n  var count = 0;\n  el.forEach(function(e) {\n    var s = window.getComputedStyle(e);\n    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') {\n      e.style.setProperty('display', 'block', 'important');\n      e.style.setProperty('visibility', 'visible', 'important');\n      e.style.setProperty('opacity', '1', 'important');\n      e.style.border = '2px dashed #f59e0b';\n      count++;\n    }\n  });\n  alert('Revealed ' + count + ' hidden element(s) with orange dashed borders.');\n  console.log('Audit: Uncovered ' + count + ' hidden DOM nodes.');\n})();"
  },
  {
    "id": "sec-subdomain-crt",
    "name": "Subdomain Finder (crt.sh)",
    "description": "Launches crt.sh Certificate Search in a new tab to find all subdomains registered for the current site.",
    "category": "penetration_testing",
    "code": "// Subdomain finder certificate log query\n(function() {\n  var host = window.location.hostname;\n  var domain = host.split('.').slice(-2).join('.');\n  var url = 'https://crt.sh/?q=%25.' + domain;\n  console.log('Querying SSL/TLS Certificate records for domain:', domain);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-dns-google",
    "name": "IP & DNS Resolver (Google DNS)",
    "description": "Opens Google Public DNS Dig tool in a new tab to inspect DNS records for the current domain name.",
    "category": "penetration_testing",
    "code": "// IP & DNS query via Google Public Dig tool\n(function() {\n  var host = window.location.hostname;\n  var url = 'https://toolbox.googleapps.com/apps/dig/#A/' + host;\n  console.log('Querying Google Dig DNS records for:', host);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-wayback-check",
    "name": "Wayback Machine Archive",
    "description": "Checks the Internet Archive Wayback Machine history and logs for the current webpage.",
    "category": "penetration_testing",
    "code": "// Wayback Machine Archive check\n(function() {\n  var url = 'https://web.archive.org/web/*/' + window.location.href;\n  console.log('Looking up history logs in Wayback Machine for:', window.location.href);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-headers-check",
    "name": "Security Headers Inspector",
    "description": "Audits HTTP security headers (CSP, HSTS, X-Frame-Options) for the current site using SecurityHeaders.com.",
    "category": "penetration_testing",
    "code": "// Security HTTP headers checker\n(function() {\n  var host = window.location.hostname;\n  var url = 'https://securityheaders.com/?q=' + host + '&followRedirects=on';\n  console.log('Auditing HTTP security parameters for:', host);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-whois-dns",
    "name": "Whois Domain Lookup",
    "description": "Redirects to DomainTools Whois search to inspect host owner registration details and server locations.",
    "category": "penetration_testing",
    "code": "// WHOIS registrar directory lookup\n(function() {\n  var host = window.location.hostname;\n  var domain = host.split('.').slice(-2).join('.');\n  var url = 'https://whois.domaintools.com/' + domain;\n  console.log('Retrieving WHOIS registrar parameters for:', domain);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-port-scan",
    "name": "Port Scanner (ViewDNS)",
    "description": "Sends the current host to ViewDNS Port Scanner to check common open server ports (80, 443, 21, 22).",
    "category": "penetration_testing",
    "code": "// Remote server port scanning lookup\n(function() {\n  var host = window.location.hostname;\n  var url = 'https://viewdns.info/portscan/?host=' + host;\n  console.log('Querying open server ports via ViewDNS for:', host);\n  window.open(url, '_blank');\n})();"
  },
  {
    "id": "sec-open-redirect",
    "name": "Open Redirect Parameter Checker",
    "description": "Finds and highlights potential open redirect parameters (e.g. url, redirect, next, dest) inside the DOM.",
    "category": "penetration_testing",
    "code": "// Open redirect parameters audit\n(function() {\n  var params = ['url', 'redirect', 'next', 'dest', 'return', 'go', 'to', 'link', 'checkout'];\n  var found = [];\n  document.querySelectorAll('a').forEach(function(a) {\n    var href = a.href;\n    params.forEach(function(p) {\n      if (href.includes('?' + p + '=') || href.includes('&' + p + '=')) {\n        a.style.outline = '3px solid #ef4444';\n        a.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';\n        found.push(a.href);\n      }\n    });\n  });\n  if (found.length > 0) {\n    alert('Found ' + found.length + ' links with possible open redirect parameters. Outlined in red!');\n    console.log('Potential open redirect pathways detected:', found);\n  } else {\n    alert('No typical open redirect parameter links identified on the current page.');\n    console.log('No parameter patterns matched redirect flags.');\n  }\n})();"
  },
  {
    "id": "sec-clickjacking",
    "name": "Clickjacking Protection Audit",
    "description": "Determines if the current page can be embedded inside a frame and audits clickjacking risk parameters.",
    "category": "penetration_testing",
    "code": "// Clickjacking validation audit\n(function() {\n  try {\n    if (window.self !== window.top) {\n      alert('This page is already embedded inside an iframe (Frame check: Embedded!). High clickjacking vulnerability if X-Frame-Options is missing.');\n    } else {\n      var f = document.createElement('iframe');\n      f.src = window.location.href;\n      f.style.position = 'fixed';\n      f.style.top = '0';\n      f.style.left = '0';\n      f.style.width = '10px';\n      f.style.height = '10px';\n      f.style.opacity = '0.01';\n      f.style.zIndex = '99999';\n      document.body.appendChild(f);\n      console.log('Spawning testing iframe to evaluate frame ancestors policies...');\n      setTimeout(function() {\n        try {\n          var doc = f.contentDocument || f.contentWindow.document;\n          alert('Audit complete: Page allowed local iframe embedding! X-Frame-Options or CSP frame-ancestors might be missing/lax.');\n          console.log('Result: Frame embedding allowed (vulnerable to clickjacking if public).');\n        } catch (err) {\n          alert('Audit complete: Page BLOCKED iframe embedding (X-Frame-Options / CSP is secure).');\n          console.log('Result: Secure. Frame embedding blocked.');\n        }\n        f.remove();\n      }, 1000);\n    }\n  } catch(e) {\n    alert('Clickjacking check error: ' + e.message);\n  }\n})();"
  },
  {
    "id": "dev-design-mode",
    "name": "Design Mode Activator",
    "description": "Enables designMode edit settings across the page DOM, turning all static elements into text inputs.",
    "category": "web_development",
    "code": "// Design mode document contenteditor toggle\n(function() {\n  if (document.designMode === 'on') {\n    document.designMode = 'off';\n    alert('Design Mode deactivated. Page content is now locked.');\n    console.log('Design mode turned OFF.');\n  } else {\n    document.designMode = 'on';\n    alert('Design Mode activated! You can now click and edit any text directly on the page.');\n    console.log('Design mode turned ON.');\n  }\n})();"
  },
  {
    "id": "dev-form-fill",
    "name": "Form Auto-Filler",
    "description": "Fills all page input fields with mock test values (names, emails, tel) to speed up QA testing.",
    "category": "web_development",
    "code": "// QA Forms mock fill parameters\n(function() {\n  var inputs = document.querySelectorAll('input, select, textarea');\n  inputs.forEach(function(i) {\n    if (i.type === 'text') i.value = 'John Doe';\n    else if (i.type === 'email') i.value = 'john.doe@example.com';\n    else if (i.type === 'tel') i.value = '555-0199';\n    else if (i.type === 'number') i.value = '42';\n    else if (i.type === 'password') i.value = 'P@ssw0rd123!';\n    else if (i.tagName === 'SELECT' && i.options.length > 1) i.selectedIndex = 1;\n    else if (i.type === 'checkbox' || i.type === 'radio') i.checked = true;\n  });\n  alert('Mock filled ' + inputs.length + ' form element(s).');\n  console.log('Mocked data fields filled for:', inputs.length, 'inputs');\n})();"
  },
  {
    "id": "dev-json-format",
    "name": "JSON Quick Formatter",
    "description": "Attempts to parse and print nicely formatted JSON structure on screen if the current page contains raw text.",
    "category": "web_development",
    "code": "// Raw text JSON prettifier\n(function() {\n  try {\n    var raw = document.body.innerText.trim();\n    var parsed = JSON.parse(raw);\n    var formatted = JSON.stringify(parsed, null, 2);\n    document.body.innerHTML = '<pre style=\"font-family:monospace;padding:20px;background:#1e293b;color:#f8fafc;font-size:13px;line-height:1.5;overflow:auto;height:100vh;box-sizing:border-box\">' + formatted + '</pre>';\n    console.log('Successfully formatted JSON document.');\n  } catch(e) {\n    alert('Error: The page content does not appear to be a valid raw JSON string.');\n    console.error('JSON parsing failed:', e);\n  }\n})();"
  },
  {
    "id": "dev-toggle-images",
    "name": "Images Hider",
    "description": "Hides all images or restores them to check layout outlines and measure raw page weights.",
    "category": "web_development",
    "code": "// Disable images visibility\n(function() {\n  var imgs = document.querySelectorAll('img');\n  var hidden = false;\n  imgs.forEach(function(img) {\n    if (img.style.visibility === 'hidden') {\n      img.style.visibility = 'visible';\n    } else {\n      img.style.visibility = 'hidden';\n      hidden = true;\n    }\n  });\n  alert(hidden ? 'Hidden all images.' : 'Restored all images.');\n  console.log('Image visibility status flipped for', imgs.length, 'nodes');\n})();"
  },
  {
    "id": "dev-aria-roles",
    "name": "ARIA Roles & Accessibility Tree",
    "description": "Outlines and displays labels for interactive elements without proper labels, checking screen-reader compatibility.",
    "category": "web_development",
    "code": "// Accessibility tags audit\n(function() {\n  var count = 0;\n  document.querySelectorAll('a, button, input, select, textarea').forEach(function(el) {\n    var role = el.getAttribute('role') || el.tagName.toLowerCase();\n    var label = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.innerText || el.placeholder || el.value;\n    if (!label) {\n      el.style.outline = '3px dotted #ec4899';\n      count++;\n    }\n  });\n  if (count > 0) {\n    alert('Identified ' + count + ' interactive element(s) with missing accessible labels (marked in dotted pink outline).');\n    console.log('Found unlabeled elements total:', count);\n  } else {\n    alert('Accessibility Check Pass: All interactive tags have labels.');\n    console.log('All elements have accessible labels verified!');\n  }\n})();"
  },
  {
    "id": "dev-lazy-load",
    "name": "Lazy Load Image Auditor",
    "description": "Checks if images are utilizing native loading=\"lazy\" attributes to save offscreen bandwidth budgets.",
    "category": "web_development",
    "code": "// Audit lazy-loading configuration for images\n(function() {\n  var imgs = document.querySelectorAll('img');\n  var missing = 0;\n  imgs.forEach(function(img) {\n    if (img.getAttribute('loading') !== 'lazy') {\n      img.style.outline = '3px dashed #ef4444';\n      missing++;\n    } else {\n      img.style.outline = '3px dashed #10b981';\n    }\n  });\n  alert('Checked ' + imgs.length + ' image(s):\\n- ' + (imgs.length - missing) + ' have loading=\"lazy\" (Green)\\n- ' + missing + ' are missing loading=\"lazy\" (Red)');\n  console.log('Lazy load stats: Missing', missing, 'of', imgs.length);\n})();"
  },
  {
    "id": "dev-core-vitals",
    "name": "Interactive Web Vitals Overlay",
    "description": "Launches a HUD widget measuring Layout Shift, LCP, and page load timers on the current screen.",
    "category": "web_development",
    "code": "// Core Web Vitals HUD overlay\n(function() {\n  var d = document;\n  var old = d.getElementById('vitals-hud'); if (old) { old.remove(); return; }\n  var hud = d.createElement('div');\n  hud.id = 'vitals-hud';\n  hud.style = 'position:fixed;bottom:20px;left:20px;background:#0f172a;color:#f8fafc;padding:15px;z-index:999999;font-family:monospace;border-radius:8px;border:1px solid #3b82f6;width:260px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.3)';\n  \n  var timing = window.performance.timing;\n  var loadTime = timing.loadEventEnd - timing.navigationStart;\n  var domTime = timing.domComplete - timing.domLoading;\n  \n  hud.innerHTML = '<h4 style=\"margin:0 0 10px;font-size:12px;color:#3b82f6;border-b:1px solid #334155;padding-bottom:5px\">Core Web Vitals Hud</h4>' +\n    '<div style=\"font-size:11px;margin-bottom:6px\">Load Time: ' + (loadTime > 0 ? loadTime + 'ms' : 'Calculating...') + '</div>' +\n    '<div style=\"font-size:11px;margin-bottom:6px\">DOM Build: ' + (domTime > 0 ? domTime + 'ms' : 'Calculating...') + '</div>' +\n    '<div style=\"font-size:11px;margin-bottom:6px\">CLS Tracker: Active</div>' +\n    '<button onclick=\"this.parentElement.remove()\" style=\"width:100%;background:#1e293b;border:none;color:#94a3b8;font-size:10px;padding:4px;border-radius:4px;cursor:pointer;margin-top:10px\">Close</button>';\n  d.body.appendChild(hud);\n  console.log('Web Vitals overlay HUD launched.');\n})();"
  },
  {
    "id": "design-dark-boost",
    "name": "Dark Mode Booster",
    "description": "Applies a rich dark-slate stylesheet override to ease eye-strain on bright corporate portals.",
    "category": "design_layout",
    "code": "// Force-inject twilight dark theme\n(function() {\n  var id = 'dark-mode-booster-style';\n  var existing = document.getElementById(id);\n  if (existing) {\n    existing.remove();\n    console.log('Dark mode booster disabled.');\n  } else {\n    var style = document.createElement('style');\n    style.id = id;\n    style.textContent = 'html, body { background: #0f172a !important; color: #cbd5e1 !important; } h1, h2, h3, h4, h5, h6, strong { color: #f8fafc !important; } a { color: #38bdf8 !important; }';\n    document.head.appendChild(style);\n    console.log('Dark mode booster active. Injected dark slate background overrides.');\n  }\n})();"
  },
  {
    "id": "design-force-fonts",
    "name": "Typography Tester (Inter)",
    "description": "Forces the entire page DOM tree to load and render standard Google Inter sans-serif typeface styles.",
    "category": "design_layout",
    "code": "// Load Google Fonts Inter and enforce globally\n(function() {\n  var id = 'typography-tester-style';\n  var existing = document.getElementById(id);\n  if (existing) {\n    existing.remove();\n    console.log('Typography tester font overrides disabled.');\n  } else {\n    var link = document.createElement('link');\n    link.rel = 'stylesheet';\n    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';\n    document.head.appendChild(link);\n    var style = document.createElement('style');\n    style.id = id;\n    style.textContent = '* { font-family: \"Inter\", sans-serif !important; }';\n    document.head.appendChild(style);\n    console.log('Typography tester active. Loaded Google Inter fonts globally.');\n  }\n})();"
  },
  {
    "id": "seo-header-map",
    "name": "Heading Map Outline Checker",
    "description": "Compiles and alerts the hierarchical structured Heading Tag sequence (H1 to H6) for structural content checks.",
    "category": "content_writing",
    "code": "// Map out heading tag hierarchy\n(function() {\n  var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');\n  if (headings.length === 0) {\n    alert('No headings (H1-H6) found on the current page.');\n    console.log('SEO Audit: No headings detected.');\n    return;\n  }\n  var map = [];\n  headings.forEach(function(h) {\n    var tag = h.tagName.toLowerCase();\n    var txt = h.innerText.trim();\n    var level = parseInt(tag[1]);\n    var indent = '  '.repeat(level - 1);\n    map.push(indent + tag.toUpperCase() + ': ' + txt);\n  });\n  alert('Heading Map Outline:\\n----------------------\\n' + map.join('\\n'));\n  console.log('Heading Structural Map:', map);\n})();"
  },
  {
    "id": "seo-readability",
    "name": "Flesch Reading Score Auditor",
    "description": "Evaluates the Flesch-Kincaid Reading Ease index score based on syllable count ratios of the visible body text copy.",
    "category": "content_writing",
    "code": "// Calculate Flesch Reading Ease score\n(function() {\n  var txt = document.body.innerText.trim();\n  var words = txt.split(/\\s+/).filter(Boolean);\n  var sentences = txt.split(/[.!?]+/).filter(Boolean);\n  if (words.length < 5) {\n    alert('Not enough words on the page to calculate readability score.');\n    console.log('SEO Audit: Word count too low.');\n    return;\n  }\n  \n  function countSyllables(word) {\n    word = word.toLowerCase();\n    if (word.length <= 3) return 1;\n    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');\n    word = word.replace(/^y/, '');\n    var matches = word.match(/[aeiouy]{1,2}/g);\n    return matches ? matches.length : 1;\n  }\n  \n  var totalSyllables = 0;\n  words.forEach(function(w) { totalSyllables += countSyllables(w); });\n  var w = words.length;\n  var s = sentences.length || 1;\n  var asl = w / s;\n  var asw = totalSyllables / w;\n  var score = 206.835 - (1.015 * asl) - (84.6 * asw);\n  var level = '';\n  \n  if (score >= 90) level = 'Very Easy (5th grade)';\n  else if (score >= 80) level = 'Easy (6th grade)';\n  else if (score >= 70) level = 'Fairly Easy (7th grade)';\n  else if (score >= 60) level = 'Standard (8th-9th grade)';\n  else if (score >= 50) level = 'Fairly Difficult (High School)';\n  else if (score >= 30) level = 'Difficult (College)';\n  else level = 'Very Confusing (College Graduate)';\n  \n  alert('Readability Index Check:\\n-------------------------\\nFlesch Score: ' + score.toFixed(1) + '\\nEstimated Grade Level: ' + level);\n  console.log('Readability Score details:', { score: score, asl: asl, asw: asw, words: w, sentences: s });\n})();"
  },
  {
    "id": "perf-pagespeed-insights",
    "name": "PageSpeed Insights Auditor",
    "description": "Launches Google PageSpeed Insights in a new tab to analyze the performance and speed optimization of the current page.",
    "category": "performance_seo",
    "code": "// Launches Google PageSpeed Insights for current page\n(function() {\n  window.open('https://developers.google.com/speed/pagespeed/insights/?url=' + encodeURIComponent(location.href));\n})();"
  },
  {
    "id": "sec-no-hijack",
    "name": "Unblock Event Hijacking (No Hijack)",
    "description": "Blocks common event hijacking techniques, like disabling paste, right-click, text selection, and some keyboard shortcuts. Run again to undo.",
    "category": "penetration_testing",
    "code": "// Block event hijacking scripts on the page\n(() => {\n    if (window._NoHijackHandlers) {\n        for (const [eventName, handler] of Object.entries(window._NoHijackHandlers)) {\n            document.removeEventListener(eventName, handler, true);\n        }\n        window._NoHijackHandlers = null;\n        alert(\"Event protection disabled. Re-enabled default page handlers.\");\n        return;\n    }\n\n    const block = e => e.stopImmediatePropagation();\n    window._NoHijackHandlers = {\n        copy: block,\n        cut: block,\n        paste: block,\n        contextmenu: block,\n        selectstart: block,\n        keydown: e => {\n            if (e.altKey && e.key.match(/[0-9]/)) {\n                e.stopImmediatePropagation();\n            }\n        }\n    };\n    for (const [eventName, handler] of Object.entries(window._NoHijackHandlers)) {\n        document.addEventListener(eventName, handler, true);\n    }\n    alert(\"NoHijack activated! Copy, paste, text selection, and right-click have been unblocked.\");\n})();"
  },
  {
    "id": "sec-go-offline",
    "name": "Force Page Offline",
    "description": "Injects a restrictive Content Security Policy (CSP) and terminates connections to test site behaviors in offline mode.",
    "category": "penetration_testing",
    "code": "// Injects CSP to block external connections\n(function() {\n    const meta = document.createElement('meta');\n    meta.httpEquiv = 'Content-Security-Policy';\n    meta.content = \"default-src 'unsafe-eval' data: blob:;\";\n    document.head.appendChild(meta);\n\n    /* stop open connections. In Firefox, this will also close many web sockets */\n    window.stop();\n    alert('Offline mode triggered! Restrictive Content Security Policy applied.');\n})();"
  },
  {
    "id": "sec-email-scraper",
    "name": "Email Address Scraper",
    "description": "Scans the page inner text to harvest and catalog all visible email addresses into a clean list window.",
    "category": "penetration_testing",
    "code": "// Email Address harvester and scraper\n(function() {\n  const emails = document.body.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g);\n  if (emails) {\n    const unique = Array.from(new Set(emails));\n    const newWin = window.open();\n    if (newWin) {\n      newWin.document.write('<html><head><title>Scraped Emails</title><style>body{font-family:sans-serif;padding:20px;background:#f8fafc;color:#0f172a}li{margin:8px 0;font-family:monospace;font-size:14px}</style></head><body><h1>Email Addresses Found (' + unique.length + ')</h1><ul>' + unique.map(e => '<li>' + e + '</li>').join('') + '</ul></body></html>');\n      newWin.document.close();\n    } else {\n      alert('Popup blocked! Please allow popups to view the ' + unique.length + ' emails found.');\n    }\n    console.log('Harvested emails:', unique);\n  } else {\n    alert('No email addresses found on this page.');\n  }\n})();"
  },
  {
    "id": "dev-web2pdf",
    "name": "Web to PDF Converter",
    "description": "Submits the active page URL to Web2PDFConvert in a new tab to generate a high-quality PDF layout printout.",
    "category": "web_development",
    "code": "// Convert page to PDF via external portal\n(function() {\n  window.open('https://www.web2pdfconvert.com#' + location.href);\n})();"
  },
  {
    "id": "sec-wappalyzer",
    "name": "Wappalyzer Profiler",
    "description": "Profiles the current page using Wappalyzer to discover software stacks, CMS versions, trackers, and libraries.",
    "category": "penetration_testing",
    "code": "// Inject Wappalyzer tech-stack discovery script\n(function() {\n  var d = document, e = d.getElementById('wappalyzer-container');\n  if (e !== null) { d.body.removeChild(e); }\n  var u = 'https://www.wappalyzer.com/',\n      c = d.createElement('div'),\n      p = d.createElement('div'),\n      l = d.createElement('link'),\n      s = d.createElement('script');\n  c.setAttribute('id', 'wappalyzer-container');\n  l.setAttribute('rel', 'stylesheet');\n  l.setAttribute('href', u + 'css/bookmarklet.css');\n  d.head.appendChild(l);\n  p.setAttribute('id', 'wappalyzer-pending');\n  p.setAttribute('style', 'background-image: url(' + u + 'images/spinner.gif) !important');\n  c.appendChild(p);\n  s.setAttribute('src', u + 'bookmarklet/wappalyzer.js');\n  s.onload = function() {\n    window.wappalyzer = new Wappalyzer();\n    var s2 = d.createElement('script');\n    s2.setAttribute('src', u + 'bookmarklet/apps.js');\n    s2.onload = function() {\n      var s3 = d.createElement('script');\n      s3.setAttribute('src', u + 'bookmarklet/driver.js');\n      c.appendChild(s3);\n    };\n    c.appendChild(s2);\n  };\n  c.appendChild(s);\n  d.body.appendChild(c);\n  console.log('Wappalyzer widget injected successfully.');\n})();"
  },
  {
    "id": "content-google-images",
    "name": "Google Images Selection Search",
    "description": "Launches a Google Images query based on highlighted text selection or custom-prompted search keywords.",
    "category": "content_writing",
    "code": "// Google Images Selection Search\n(function() {\n  var q = \"\" + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);\n  if (!q) q = prompt(\"Search terms? ...\", \"\");\n  if (q != null) {\n    window.open(\"https://images.google.com/images?q=\" + encodeURIComponent(q), \"_blank\");\n  }\n})();"
  },
  {
    "id": "perf-sitemap-analyzer",
    "name": "XML Sitemap Finder & Analyzer",
    "description": "Queries sitemap.xml and sitemap-index.xml locations, auditing server HTTP response codes and indexing configurations.",
    "category": "performance_seo",
    "code": "// XML Sitemap Detector & Status Auditor\n(() => {\n  const t = new URL(window.location.href);\n  const locations = [\n    `${t.protocol}//${t.hostname}/sitemap.xml`,\n    `${t.protocol}//${t.hostname}/sitemap-index.xml`\n  ];\n  Promise.all(locations.map(url => \n    fetch(url)\n      .then(res => ({ url, status: res.ok, statusCode: res.status }))\n      .catch(() => ({ url, status: false, statusCode: 404 }))\n  )).then(results => {\n    const popup = document.createElement(\"div\");\n    popup.className = \"seo-popup\";\n    popup.style.cssText = `\n      position: fixed;\n      top: 20px;\n      right: 20px;\n      width: 80%;\n      max-width: 600px;\n      max-height: 80vh;\n      background: #ffffff;\n      color: #0f172a;\n      padding: 20px;\n      border-radius: 8px;\n      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);\n      z-index: 100000;\n      overflow-y: auto;\n      font-family: system-ui, -apple-system, sans-serif;\n      border: 1px solid #e2e8f0;\n    `;\n    const foundCount = results.filter(r => r.status).length;\n    popup.innerHTML = `\n      <div style=\"display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;\">\n        <h3 style=\"margin: 0; font-size: 16px;\">XML Sitemap Analysis</h3>\n        <button onclick=\"this.closest('.seo-popup').remove()\" style=\"background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;\">Close</button>\n      </div>\n      <div style=\"margin-bottom: 15px; padding: 10px; border: 1px solid ${foundCount ? '#10b981' : '#ef4444'}; background: \u000balue = ${foundCount ? '#ecfdf5' : '#fef2f2'}; border-radius: 6px;\">\n        <strong style=\"color: ${foundCount ? '#065f46' : '#991b1b'}\">\n          ${foundCount ? `Found ${foundCount} sitemap file(s)` : 'No standard sitemaps found'}\n        </strong>\n      </div>\n      <h4 style=\"margin: 0 0 8px; font-size:14px;\">Locations Checked:</h4>\n      ${results.map(r => `\n        <div style=\"padding: 8px; margin-bottom: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 12px; font-family: monospace; word-break: break-all;\">\n          <span style=\"color: ${r.status ? '#10b981' : '#ef4444'}; font-size: 14px; margin-right: 6px;\">●</span>\n          <a href=\"${r.url}\" target=\"_blank\" style=\"color:#2563eb; text-decoration:underline;\">${r.url}</a>\n          <div style=\"margin-top: 4px; color: #64748b;\">HTTP Status: <strong>${r.statusCode}</strong></div>\n        </div>\n      `).join('')}\n    `;\n    document.body.appendChild(popup);\n  });\n})();"
  },
  {
    "id": "dev-unused-css",
    "name": "Unused CSS Detector",
    "description": "Analyzes the stylesheet rules in relation to active elements inside the DOM to report any unused CSS rules.",
    "category": "web_development",
    "code": "// Unused CSS stylesheet rule checker\n(() => {\n  const stylesheets = document.querySelectorAll('style, link[rel=\"stylesheet\"]');\n  const unusedRules = [];\n  const allElements = document.getElementsByTagName(\"*\");\n  \n  stylesheets.forEach(sheetEl => {\n    let rules;\n    if (sheetEl.tagName === \"STYLE\") {\n      rules = Array.from(sheetEl.sheet?.cssRules || []);\n    } else {\n      try {\n        rules = Array.from(sheetEl.sheet?.cssRules || []);\n      } catch (e) {\n        return; // CORS restriction\n      }\n    }\n    \n    rules.forEach(rule => {\n      if (rule instanceof CSSStyleRule) {\n        let isUsed = false;\n        for (const el of allElements) {\n          try {\n            if (el.matches(rule.selectorText)) {\n              isUsed = true;\n              break;\n            }\n          } catch (err) {}\n        }\n        if (!isUsed) {\n          unusedRules.push({\n            selector: rule.selectorText,\n            styles: rule.style.cssText,\n            source: sheetEl.tagName === \"STYLE\" ? \"Internal Stylesheet\" : sheetEl.href\n          });\n        }\n      }\n    });\n  });\n\n  const container = document.createElement(\"div\");\n  container.className = \"unused-css-popup\";\n  container.style.cssText = `\n    position: fixed;\n    top: 20px;\n    right: 20px;\n    width: 600px;\n    max-height: 80vh;\n    padding: 20px;\n    background: #ffffff;\n    color: #0f172a;\n    border-radius: 8px;\n    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);\n    z-index: 100000;\n    overflow-y: auto;\n    font-family: system-ui, -apple-system, sans-serif;\n    border: 1px solid #e2e8f0;\n  `;\n  \n  container.innerHTML = `\n    <div style=\"display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;\">\n      <strong style=\"font-size: 16px;\">Unused CSS Detector</strong>\n      <button onclick=\"this.closest('.unused-css-popup').remove()\" style=\"background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;\">✕</button>\n    </div>\n    <div style=\"margin-bottom: 15px; font-weight: bold; font-size: 14px;\">\n      Total Unused Rules Found: ${unusedRules.length}\n    </div>\n    <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n      ${unusedRules.map(rule => `\n        <div style=\"padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-family: monospace;\">\n          <div style=\"margin-bottom: 4px; color: #1e293b;\"><strong>Selector:</strong> ${rule.selector}</div>\n          <div style=\"margin-bottom: 4px; color: #475569; white-space: pre-wrap; word-break: break-all;\"><strong>Styles:</strong> ${rule.styles}</div>\n          <div style=\"font-size: 11px; color: #64748b; word-break: break-all;\"><strong>Source:</strong> ${rule.source}</div>\n        </div>\n      `).join('')}\n    </div>\n    ${unusedRules.length === 0 ? '<div style=\"color: #10b981; font-weight: bold;\">No unused CSS rules found on this page. Perfect!</div>' : ''}\n  `;\n  document.body.appendChild(container);\n  console.log('Unused CSS analyzer complete. Rules found:', unusedRules.length);\n})();"
  }
];

let query = '';
let selectedCategory = 'all';
let customTools = [];

// DOM elements
const searchBar = document.getElementById('search-bar');
const scriptsList = document.getElementById('scripts-list');
const logger = document.getElementById('logger');
const tabsContainer = document.getElementById('tabs-container');

// Custom Panel DOM elements
const toggleAddPanelBtn = document.getElementById('toggle-add-panel-btn');
const customSnippetPanel = document.getElementById('custom-snippet-panel');
const customNameInput = document.getElementById('custom-name');
const customDescInput = document.getElementById('custom-desc');
const customCodeInput = document.getElementById('custom-code');
const customCategorySelect = document.getElementById('custom-category');
const newCategoryGroup = document.getElementById('new-category-group');
const newCategoryNameInput = document.getElementById('new-category-name');
const cancelCustomBtn = document.getElementById('cancel-custom-btn');
const saveCustomBtn = document.getElementById('save-custom-btn');

// Log messaging helper
function logMessage(text) {
  const line = document.createElement('div');
  line.className = 'log-line';
  line.textContent = `> ${text}`;
  logger.appendChild(line);
  logger.scrollTop = logger.scrollHeight;
}

// Storage Helpers
let pinnedToolIds = [];

function loadCustomTools(callback) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get({ custom_tools: [], pinned_tools: [] }, (result) => {
      customTools = result.custom_tools || [];
      pinnedToolIds = result.pinned_tools || [];
      if (callback) callback();
    });
  } else {
    try {
      const stored = localStorage.getItem('custom_tools');
      customTools = stored ? JSON.parse(stored) : [];
      const storedPins = localStorage.getItem('pinned_tools');
      pinnedToolIds = storedPins ? JSON.parse(storedPins) : [];
    } catch (e) {
      console.error('Failed to load custom tools or pins from localStorage:', e);
      customTools = [];
      pinnedToolIds = [];
    }
    if (callback) callback();
  }
}

function saveCustomTools(callback) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ custom_tools: customTools }, () => {
      if (callback) callback();
    });
  } else {
    try {
      localStorage.setItem('custom_tools', JSON.stringify(customTools));
    } catch (e) {
      console.error('Failed to save custom tools to localStorage:', e);
    }
    if (callback) callback();
  }
}

function savePinnedTools(callback) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ pinned_tools: pinnedToolIds }, () => {
      if (callback) callback();
    });
  } else {
    try {
      localStorage.setItem('pinned_tools', JSON.stringify(pinnedToolIds));
    } catch (e) {
      console.error('Failed to save pinned tools to localStorage:', e);
    }
    if (callback) callback();
  }
}

function sanitizeCategory(name) {
  if (!name) return 'custom_category';
  return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

// Update the Category Dropdown options dynamically
function updateCategoryDropdown() {
  if (!customCategorySelect) return;
  
  const defaultCategories = [
    { id: 'design_layout', name: 'Layout' },
    { id: 'typography_colors', name: 'Colors' },
    { id: 'responsive_testing', name: 'Responsive' },
    { id: 'development_utilities', name: 'Dev-Utils' },
    { id: 'performance_seo', name: 'SEO & Perf' },
    { id: 'advanced_tools', name: 'Diagnostics' },
    { id: 'penetration_testing', name: 'Security' },
    { id: 'web_development', name: 'WebDev' },
    { id: 'content_writing', name: 'Content' }
  ];
  
  const customCats = new Set();
  customTools.forEach(t => {
    const isDefault = defaultCategories.some(dc => dc.id === t.category);
    if (!isDefault && t.category) {
      customCats.add(t.category);
    }
  });
  
  customCategorySelect.innerHTML = '';
  defaultCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    customCategorySelect.appendChild(opt);
  });
  
  customCats.forEach(catId => {
    const opt = document.createElement('option');
    opt.value = catId;
    opt.textContent = catId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    customCategorySelect.appendChild(opt);
  });
  
  const newOpt = document.createElement('option');
  newOpt.value = 'new_category';
  newOpt.textContent = '+ Create New Category';
  customCategorySelect.appendChild(newOpt);
}

// Render tabs dynamically
function renderTabs() {
  if (!tabsContainer) return;
  tabsContainer.innerHTML = '';

  const defaultTabs = [
    { id: 'all', name: 'All' },
    { id: 'design_layout', name: 'Layout' },
    { id: 'typography_colors', name: 'Colors' },
    { id: 'responsive_testing', name: 'Responsive' },
    { id: 'development_utilities', name: 'Dev-Utils' },
    { id: 'performance_seo', name: 'SEO & Perf' },
    { id: 'advanced_tools', name: 'Diagnostics' },
    { id: 'penetration_testing', name: 'Security' },
    { id: 'web_development', name: 'WebDev' },
    { id: 'content_writing', name: 'Content' }
  ];

  const customCats = new Set();
  customTools.forEach(t => {
    const isDefault = defaultTabs.some(dt => dt.id === t.category);
    if (!isDefault && t.category) {
      customCats.add(t.category);
    }
  });

  const allTabs = [...defaultTabs];
  customCats.forEach(catId => {
    const name = catId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    allTabs.push({ id: catId, name: name });
  });

  allTabs.forEach(t => {
    const btn = document.createElement('button');
    btn.className = `tab ${selectedCategory === t.id ? 'active' : ''}`;
    btn.setAttribute('data-category', t.id);
    btn.textContent = t.name;
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = t.id;
      logMessage(`Switched filter category: ${t.name.toUpperCase()}`);
      renderTools();
    });
    tabsContainer.appendChild(btn);
  });
}

// Render dynamic list
function renderTools() {
  scriptsList.innerHTML = '';
  
  const combinedTools = [...TOOLS, ...customTools];
  
  const filtered = combinedTools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase()) || 
                          t.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Sort: Pinned first, then maintain relative order
  filtered.sort((a, b) => {
    const aPinned = pinnedToolIds.includes(a.id);
    const bPinned = pinnedToolIds.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  if (filtered.length === 0) {
    scriptsList.innerHTML = `
      <div style="padding: 24px 12px; text-align: center; color: var(--text-muted);">
        No developer tools match active criteria.
      </div>
    `;
    return;
  }

  filtered.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'script-card';
    if (tool.isCustom) {
      card.style.border = '1px solid rgba(245, 158, 11, 0.4)';
    }
    
    // category mapping
    let catClass = 'layout';
    if (tool.category === 'typography_colors') catClass = 'design';
    else if (tool.category === 'responsive_testing') catClass = 'responsive';
    else if (tool.category === 'development_utilities') catClass = 'utility';
    else if (tool.category === 'performance_seo') catClass = 'seo';
    else if (tool.category === 'advanced_tools') catClass = 'advanced';
    else if (tool.category === 'penetration_testing') catClass = 'penetration';
    else if (tool.category === 'web_development') catClass = 'webdev';
    else if (tool.category === 'content_writing') catClass = 'content';
    else catClass = 'custom';

    const prettyCat = tool.category.replace(/_/g, ' ').toUpperCase();
    const customMark = tool.isCustom ? '<span class="custom-badge">★ Custom</span>' : '';
    const isPinned = pinnedToolIds.includes(tool.id);

    card.innerHTML = `
      <div class="script-header">
        <span class="script-title">${tool.name}${customMark}</span>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-id="${tool.id}" title="${isPinned ? 'Unpin script' : 'Pin script'}">
            📌
          </button>
          <span class="script-cat-tag cat-${catClass}">${prettyCat}</span>
        </div>
      </div>
      <p class="script-desc">${tool.description}</p>
      <div class="script-actions">
        <button class="btn btn-primary run-btn" data-id="${tool.id}">
          Inject Code
        </button>
        <button class="btn btn-secondary copy-btn" data-id="${tool.id}">
          Copy Snippet
        </button>
        ${tool.isCustom ? `<button class="btn btn-secondary delete-btn" data-id="${tool.id}" style="max-width:32px; background:rgba(239, 72, 153, 0.1); color:#f472b6; border-color:rgba(239, 72, 153, 0.2); cursor:pointer">✕</button>` : ''}
      </div>
    `;
    scriptsList.appendChild(card);
  });

  // Attach button triggers
  document.querySelectorAll('.run-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const toolId = e.currentTarget.getAttribute('data-id');
      const tool = [...TOOLS, ...customTools].find(t => t.id === toolId);
      if (tool) injectCode(tool);
    });
  });

  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const toolId = e.currentTarget.getAttribute('data-id');
      const idx = pinnedToolIds.indexOf(toolId);
      if (idx > -1) {
        pinnedToolIds.splice(idx, 1);
        logMessage(`Unpinned script`);
      } else {
        pinnedToolIds.push(toolId);
        logMessage(`Pinned script to top!`);
      }
      savePinnedTools(() => {
        renderTools();
      });
    });
  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const toolId = e.currentTarget.getAttribute('data-id');
      const tool = [...TOOLS, ...customTools].find(t => t.id === toolId);
      if (tool) {
        navigator.clipboard.writeText(tool.code);
        logMessage(`Copied ${tool.name} script to clipboard!`);
        
        // Quick visual toggle
        const prevText = e.currentTarget.innerText;
        e.currentTarget.innerText = 'Copied!';
        setTimeout(() => {
          e.currentTarget.innerText = prevText;
        }, 1000);
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const toolId = e.currentTarget.getAttribute('data-id');
      const toolName = [...TOOLS, ...customTools].find(t => t.id === toolId)?.name || 'Custom tool';
      customTools = customTools.filter(t => t.id !== toolId);
      saveCustomTools(() => {
        logMessage(`Deleted custom snippet "${toolName}"`);
        renderTabs();
        renderTools();
        updateCategoryDropdown();
      });
    });
  });
}

// Script Ingestion Logic for Manifest V3 extension
function injectCode(tool) {
  logMessage(`Attempting injection: "${tool.name}"...`);

  // Query browser tab
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError || !tabs || tabs.length === 0) {
        logMessage(`Error: Open a webpage to run injection script.`);
        console.error(chrome.runtime.lastError);
        return;
      }

      const activeTab = tabs[0];
      
      // Check for restricted chrome:// or edge:// pages
      if (activeTab.url && (activeTab.url.startsWith('chrome://') || activeTab.url.startsWith('edge://') || activeTab.url.startsWith('about:') || activeTab.url.startsWith('chrome-extension://'))) {
        const errorMsg = `Browser security limits prevent extension script execution on internal system pages (${activeTab.url.split('/')[2] || 'system'}). Please open a regular web page to use this tool.`;
        logMessage(`Error: ${errorMsg}`);
        alert(errorMsg);
        return;
      }
      
      // Check for Chrome Web Store
      if (activeTab.url && (activeTab.url.includes('chrome.google.com/webstore') || activeTab.url.includes('chromewebstore.google.com') || activeTab.url.includes('microsoftedge.microsoft.com/addons'))) {
        const webStoreMsg = `Browser security policies strictly block extensions from running script injection on official Extension Web Stores for account and system safety. Please open any other website to inject this tool.`;
        logMessage(`Error: ${webStoreMsg}`);
        alert(webStoreMsg);
        return;
      }
      
      if (!activeTab.id) {
        logMessage(`Error: Active tab ID not available.`);
        return;
      }
      
      // Inject the script programmatically
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        world: 'MAIN',
        func: (jsCode, toolName) => {
          try {
            // Step 1: Parse and compile the javascript function
            const fn = new Function(jsCode);
            
            // Step 2: Execute the compiled function and catch runtime errors
            try {
              fn();
            } catch (runErr) {
              console.error(`QuickScripts Tool [${toolName}] Runtime Error:`, runErr);
              alert(`Runtime Error inside "${toolName}":\\n\\n${runErr.name}: ${runErr.message}\\n\\nPlease check the browser's DevTools Console (F12) for the complete execution stack trace.`);
            }
          } catch (syntaxErr) {
            console.error(`QuickScripts Tool [${toolName}] Syntax Compile Error:`, syntaxErr);
            alert(`Syntax Error in "${toolName}"!\\n\\nCould not compile or parse the JavaScript code.\\n\\nError details: ${syntaxErr.message}\\n\\nPlease edit your script to fix syntax formatting issues.`);
          }
        },
        args: [tool.code, tool.name]
      }, (results) => {
        if (chrome.runtime.lastError) {
          const chromeErr = chrome.runtime.lastError.message || '';
          logMessage(`Failed: ${chromeErr}`);
          console.error(chrome.runtime.lastError);
          
          alert(`Could not inject "${tool.name}" on this page!\\n\\nReason: ${chromeErr}\\n\\nTips:\\n- Ensure the page has fully finished loading.\\n- If this is a local local file (file:// URL), please enable "Allow access to file URLs" in the extension settings page.`);
        } else {
          logMessage(`Success! Executed "${tool.name}" successfully.`);
        }
      });
    });
  } else {
    // Standard web sandbox simulation fallback
    try {
      const fn = new Function(tool.code);
      try {
        fn();
        logMessage(`Simulator Executed: "${tool.name}"`);
      } catch (runErr) {
        logMessage(`Simulator Runtime Error: ${runErr.message}`);
        console.error(runErr);
        alert(`Simulator Runtime Error in "${tool.name}":\\n\\n${runErr.name}: ${runErr.message}`);
      }
    } catch (syntaxErr) {
      logMessage(`Simulator Syntax Error: ${syntaxErr.message}`);
      console.error(syntaxErr);
      alert(`Simulator Syntax Error in "${tool.name}":\\n\\n${syntaxErr.message}\\n\\nPlease correct the JavaScript syntax format.`);
    }
  }
}

// Form Category Dropdown change handler
if (customCategorySelect) {
  customCategorySelect.addEventListener('change', (e) => {
    if (e.target.value === 'new_category') {
      newCategoryGroup.classList.remove('hidden');
    } else {
      newCategoryGroup.classList.add('hidden');
    }
  });
}

// Form Cancel handler
if (cancelCustomBtn) {
  cancelCustomBtn.addEventListener('click', () => {
    customSnippetPanel.classList.add('hidden');
    customNameInput.value = '';
    customDescInput.value = '';
    customCodeInput.value = '';
    newCategoryNameInput.value = '';
    customCategorySelect.value = 'design_layout';
    newCategoryGroup.classList.add('hidden');
  });
}

// Header Add button toggle handler
if (toggleAddPanelBtn) {
  toggleAddPanelBtn.addEventListener('click', () => {
    customSnippetPanel.classList.toggle('hidden');
    if (!customSnippetPanel.classList.contains('hidden')) {
      customNameInput.focus();
    }
  });
}

// Save Custom Snippet handler
if (saveCustomBtn) {
  saveCustomBtn.addEventListener('click', () => {
    const name = customNameInput.value.trim();
    const desc = customDescInput.value.trim() || 'Custom user snippet';
    const rawCode = customCodeInput.value.trim();
    const selectedCat = customCategorySelect.value;
    
    if (!name) {
      alert('Please enter a name for your snippet.');
      return;
    }
    
    if (!rawCode) {
      alert('Please enter javascript code.');
      return;
    }
    
    let finalCat = selectedCat;
    if (selectedCat === 'new_category') {
      const newCatVal = newCategoryNameInput.value.trim();
      if (!newCatVal) {
        alert('Please enter a name for the new category.');
        return;
      }
      finalCat = sanitizeCategory(newCatVal);
    }
    
    // Ensure bookmarklet is formatted correctly (convert raw javascript if needed or keep)
    let formattedCode = rawCode;
    if (!rawCode.toLowerCase().startsWith('javascript:')) {
      // Just wrap it if it looks like pure javascript code
      if (!rawCode.startsWith('(function')) {
        formattedCode = `(function(){\\n${rawCode}\\n})();`;
      }
    } else {
      // It's a javascript: link, extract code
      formattedCode = decodeURIComponent(rawCode.slice(11));
    }

    // Syntax validation check
    try {
      new Function(formattedCode);
    } catch (syntaxErr) {
      const confirmSave = window.confirm(
        `⚠️ Warning: There is a syntax error in your JavaScript code!\\n\\nDetails: ${syntaxErr.message}\\n\\nDo you still want to save it?`
      );
      if (!confirmSave) {
        return;
      }
    }
    
    const newTool = {
      id: 'custom-' + Date.now(),
      name: name,
      description: desc,
      category: finalCat,
      code: formattedCode,
      isCustom: true
    };
    
    customTools.push(newTool);
    saveCustomTools(() => {
      logMessage(`Saved custom snippet "${name}"!`);
      
      // Clear inputs
      customNameInput.value = '';
      customDescInput.value = '';
      customCodeInput.value = '';
      newCategoryNameInput.value = '';
      customCategorySelect.value = 'design_layout';
      newCategoryGroup.classList.add('hidden');
      customSnippetPanel.classList.add('hidden');
      
      // Re-initialize
      updateCategoryDropdown();
      renderTabs();
      renderTools();
    });
  });
}

// Search interaction
if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    query = e.target.value;
    renderTools();
  });
}

// Initial boot
loadCustomTools(() => {
  updateCategoryDropdown();
  renderTabs();
  renderTools();
  logMessage('Interactive scripts list generated.');
});
