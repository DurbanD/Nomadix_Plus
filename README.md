# Nomadix Plus – Bulk Passthrough-Address Importer

[![GitHub license](https://img.shields.io/github/license/DurbanD/Nomadix_Plus)](https://github.com/DurbanD/Nomadix_Plus/blob/main/LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)](https://developer.chrome.com/docs/extensions/)

**Nomadix Plus** is a lightweight Chrome extension that adds a *“Bulk Import”* button to the Nomadix hotspot admin UI.  
Instead of entering passthrough addresses line-by-line, you can paste a multi-line list (one address per line) and let the extension fill the form automatically.

Perfect for new installations where dozens or hundreds of static IPs, MACs, or hostnames need to be added in one go.

---

## Why it exists

- Nomadix’s native UI only allows a single entry at a time.  
- Large deployments (hotels, campuses, conference centers) often require **hundreds** of passthrough rules.  
- Manual entry is **time-consuming, error-prone, and boring**.

Nomadix Plus turns a 30-minute chore into a 30-second copy-paste.

---

## Features

| Feature | Description |
|---------|-------------|
| **One-click bulk import** | Paste a block of addresses and click *Import*. |
| **Auto-scroll & fill** | The extension expands the form, fills each row, and clicks *Add* for you. |
| **Retry-friendly** | If a batch is large, just re-run the import – it resumes where it left off. |
| **Zero server side** | Runs entirely in the browser; no external dependencies. |

---

## Installation (Manual Load)

The extension is **not** published on the Chrome Web Store, so you load it locally:

1. **Clone or download** this repository.  
   ```bash
   git clone https://github.com/DurbanD/Nomadix_Plus.git
   ```
2. Open Chrome → `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** → select the folder containing `manifest.json`.
5. The **Nomadix Plus** icon appears next to the address bar.

> **Note:** You must be logged into a Nomadix device’s admin interface for the button to appear.

---

## Usage

1. Navigate to the **Passthrough Addresses** page in the Nomadix UI.  
2. Click the **Nomadix Plus** icon (or the new **Bulk Import** button that the extension injects).  
3. A modal opens – paste your list (one address per line). Example:

   ```
   192.168.10.5
   192.168.10.6
   printer.example.com
   00:1A:2B:3C:4D:5E
   ```

4. Press **Import**.  
5. Watch the rows fill automatically. For very large sets you may need to run the import a second time if the UI throttles.

---

## Limitations & Tips

- **Large batches** (> 100 rows) can occasionally be throttled by the Nomadix UI. Simply re-run the import; it will continue from the last successful entry.
- Works only on the **official Nomadix admin pages** (tested on AG-5800/5900 series).
- No data is sent outside your browser.

---
