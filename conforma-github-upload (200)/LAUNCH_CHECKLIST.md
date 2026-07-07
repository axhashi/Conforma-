# Conforma — Launch Checklist

## 1. Deploy (GitHub + Netlify — recommended)
- [ ] Put this `deploy` folder in a GitHub repo (commit everything EXCEPT `node_modules` and `dist`).
- [ ] Netlify -> Add new site -> Import from Git -> pick the repo (build settings load from `netlify.toml`).
- [ ] Netlify -> Site settings -> Environment variables -> add `ANTHROPIC_API_KEY` (required).
- [ ] (Optional) add `CLAUDE_MODEL`.
- [ ] Deploy. Visit the site.

## 2. Verify it works
- [ ] Landing page loads (dark hero, gold seal animates).
- [ ] Click "See it build one live" -> demo builds -> workspace shows documents.
- [ ] Upload the sample: `public/samples/Sample_PWS_Enterprise_Help_Desk.md`.
      It should read the file and generate the full system (takes a few minutes).
- [ ] Open a generated document; export to Word; download all.

## 3. Make it yours (all near the top of `src/App.jsx`)
- [ ] `BRAND` — product name.
- [ ] `PRICING` — plans and prices.
- [ ] `CHECKOUT` — paste your Stripe Payment Links so the pricing buttons take real payment.
- [ ] Update the contact email in `CHECKOUT.contact`.

## 4. Before pointing a real customer at it
- [ ] Confirm your Anthropic billing / spend limits (each contract = ~29 AI calls).
- [ ] Use NON-sensitive / non-CUI contracts on this version.
      For federal/CUI data, deploy the AI on FedRAMP GovCloud (see the architecture doc).

## Custom domain (optional)
- [ ] Netlify -> Domain settings -> add your domain (e.g. conforma.io) and follow the DNS steps.
