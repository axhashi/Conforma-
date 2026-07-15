# Conforma — Deploy Guide

Turn a contract into an audit-ready ISO/IEC 20000-1 system. This is the production
build (Vite + React) with a Netlify serverless function that holds your AI key, so
your users can upload and generate **without pasting any API key**.

## What's in here
- `src/App.jsx` — the whole product (landing + app).
- `netlify/functions/ai.js` — server-side AI proxy (keeps your Anthropic key hidden).
- `netlify.toml`, `vite.config.js`, `index.html`, `package.json`.

## Prerequisites
- An **Anthropic API key** (console.anthropic.com).
- A free **Netlify** account.

## Deploy — recommended (GitHub + Netlify)
1. Put this folder in a GitHub repo (commit everything **except** `node_modules` and `dist`).
2. Netlify → **Add new site → Import from Git** → pick the repo.
   Build settings auto-load from `netlify.toml` (build `npm run build`, publish `dist`, functions `netlify/functions`).
3. **Site settings → Environment variables** → add:
   - `ANTHROPIC_API_KEY` = your key (required)
   - `CLAUDE_MODEL` = e.g. `claude-3-5-sonnet-latest` (optional; change the model here)
4. **Deploy**. Uploads now work for anyone — the key stays on the server.

## Deploy — fast (Netlify CLI)
```bash
npm install -g netlify-cli
netlify login
netlify env:set ANTHROPIC_API_KEY sk-ant-your-key
netlify deploy --build --prod
```

## How it works
Upload → the app calls `/.netlify/functions/ai` → the function calls Anthropic with your
hidden key → documents come back. No key ever reaches the browser.

## Test locally (with the function running)
```bash
npm install
npm install -g netlify-cli
netlify env:set ANTHROPIC_API_KEY sk-ant-your-key
netlify dev        # runs the site AND the function at localhost:8888
```
(`npm run dev` runs only the front-end — uploads need the function, so use `netlify dev`.)

## Cost note
Each contract generates the full system = roughly **29 AI calls**. Budget your API
spend accordingly. Users can also connect their **own** key in Settings (then it uses
theirs, not yours).

## Data / compliance
This runs on the standard Anthropic API, which is **not** FedRAMP-authorized. For pilots,
use sanitized or non-CUI contracts. For federal/CUI data, deploy the AI on FedRAMP
GovCloud (AWS Bedrock) — see `Conforma_Enterprise_Security_Architecture.md`.

## Customize (all near the top of src/App.jsx)
- `BRAND` — product name.
- `PRICING` — plans/prices.
- `CHECKOUT` — paste your Stripe Payment Links so the pricing buttons take real payment.
