# ASML site reproduction

A static, multi-page reproduction of the main English ASML navigation and selected editorial pages. The generated output lives in `dist/`.

## Build

```sh
npm run build
```

No dependencies are needed. `generate.mjs` builds the navigation routes and page templates from `src/data.mjs`, `src/styles.css`, and `src/site.js`.

## Preview locally

From this folder, run `python3 -m http.server 8000 --directory dist`, then open `http://localhost:8000/en/`. Keep the server running while navigating between pages.

This is an unofficial design exercise. News and investor destinations lead to ASML's live investor website. Media files are served from ASML's public media host; their availability depends on that host.
