# ASML site reproduction

A static, multi-page reproduction of the main English ASML navigation and selected editorial pages. The generated output lives in `dist/`.

## Run

```sh
npm run dev
```

This builds the site into `dist/` and then serves it on `http://localhost:3000/en/`. Keep the terminal running while navigating between pages. It is a one-off build plus a static server, so re-run it after changing files in `src/`.

## Build only

```sh
npm run build
```

No dependencies are needed. `generate.mjs` builds the navigation routes and page templates from `src/data.mjs`, `src/styles.css`, and `src/site.js`.

To preview a build manually, run `python3 -m http.server 8000 --directory dist`, then open `http://localhost:8000/en/`.

This is an unofficial design exercise. News and investor destinations lead to ASML's live investor website. Media files are served from ASML's public media host; their availability depends on that host.
