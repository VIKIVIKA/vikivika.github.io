# back-button-test

A tiny multi-page site to reproduce and verify fixes for — the Safari back-button bug caused by the ChatFactory widget iframe adding extra entries to the parent window's session history.

It is intentionally **not a SPA**. Each nav link is a full page load, which is what triggers the widget iframe to be re-inserted and re-navigated on every top-level navigation — the exact condition the bug needs.

## What it does

- Six pages (`index.html`, `products.html`, `features.html`, `pricing.html`, `about.html`, `contact.html`), each with a nav bar linking to the others.
- Loads the ChatFactory widget on every page from the dev CDN:
  `https://cdn-app.pathfactory-development.com/libraries/chatfactory/widget/index.js`
- Shows a live `history.length` panel bottom-right on every page:
  - current `history.length`
  - **Δ since previous page load** — this is the smoking gun on Safari
  - a rolling log of the last few page loads
  - detected browser (Safari vs Other)
  - whether the widget's iframe actually mounted

## Two ways to run it

### 1. Local

```bash
cd pf-code-repo/back-button-test
node server.js
# → http://localhost:4321
```

No install step, no dependencies, Node 18+. `server.js` serves `public/` exactly as GitHub Pages will — no clean-URL rewriting, no build step — so what you see locally is what deploys.

### 2. GitHub Pages (one-time setup)

The `public/` folder is a fully static site. Deploy it with the workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Push this repo (or just the `back-button-test/` subtree) to a GitHub repo.
2. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** (not "Deploy from a branch").
3. Push to `main` — the workflow builds and deploys automatically. Any change under `back-button-test/public/**` re-triggers it. You can also run it manually from the Actions tab.
4. The deployed URL will be `https://<user>.github.io/<repo>/`.

If you fork this into a standalone repo containing only the `back-button-test/` contents, move `public/` to the repo root (or keep it and adjust `path: public` in the workflow) and drop the `back-button-test/` prefix from the workflow's `paths:` filter.

Everything under `public/` uses **relative paths** (`href="products.html"`, `src="widget-init.js"`), so the site works whether it's served from `/` or from `/<repo-name>/`.

Notes:

- The widget is fetched cross-origin from `cdn-app.pathfactory-development.com`. The widget script's XHR to `jukebox.pathfactory-development.com` uses `withCredentials: true`; if that CORS check rejects a Pages origin, the widget won't mount. In that case, run locally or temporarily allowlist the Pages origin on the dev jukebox.
- `.nojekyll` is included so Pages serves the folder verbatim.



1. Open **Safari**, go to the site (local or Pages URL).
2. Watch the debug panel bottom-right. On first load `history.length` will be 1.
3. Click **Products** in the nav.
4. Click **Features**.
5. Note the **Δ** column. With the buggy widget on affected Safari, at least one hop shows **+2** — that extra +1 is the phantom iframe entry.
6. Press the browser's Back button **once**. If the URL stays put, the bug is live. If it moves back one page, either the fix is already deployed or the widget didn't mount.
7. Repeat in Chrome or Firefox — Δ is always +1, Back always works. This confirms the bug is Safari-only, per the ticket.

## How to verify a fix

Point the CDN at a build with the patched widget (or edit `WIDGET_SRC` in `public/widget-init.js` to load a local/staging copy), reload the harness, and repeat the flow. Every Δ should be **+1** on Safari, and the browser's Back button should return to the previous page on the first click.

The panel and console also log a JSON line on every page load:

```
[history-probe] {"path":"/features.html","historyLength":3,"deltaSincePrev":1}
```

so you can diff runs without watching the panel.

## Changing the agent / environment

Edit `public/widget-init.js`:

```js
const WIDGET_SRC = "https://cdn-app.pathfactory-development.com/libraries/chatfactory/widget/index.js";

const CHAT_CONFIG = {
  token: "f4ba9ffc-dd14-4a02-affe-f41095f00305",
  clientId: "LB-DAE926E6-125",
  apiHost: "https://jukebox.pathfactory-development.com",
  widgetType: "test_search",
};
```

The bug does **not** require the widget's API calls to succeed — the phantom Safari history entry is created the moment the iframe is inserted with a resolvable `src`, before any round-trip.

## Files

```
back-button-test/
├── README.md
├── server.js                       # local static server (mirrors Pages behaviour)
├── .github/workflows/deploy.yml    # Pages deploy workflow
└── public/                         # deployed as-is
    ├── .nojekyll
    ├── index.html
    ├── products.html
    ├── features.html
    ├── pricing.html
    ├── about.html
    ├── contact.html
    ├── styles.css
    ├── history-probe.js            # renders the bottom-right debug panel
    └── widget-init.js              # injects the CDN widget script and calls initializeChatWidget
```
