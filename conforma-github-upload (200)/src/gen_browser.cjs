// Browser-side deterministic generator bridge.
// After the AI extracts the contract context (one fast call), the live build uses
// these pure functions to produce every document instantly — no per-doc AI calls,
// so nothing can hit a serverless timeout.
const { buildSet } = require("./docgen.cjs");
const { buildSet27k } = require("./docgen27k.cjs");
const { buildSetCmmc } = require("./docgen_cmmc.cjs");
const { buildSet9001, buildSet22301, buildSet42001, buildSetSoc2 } = require("./docgen_more.cjs");

function pick(v, d) { return (v && String(v).trim()) ? String(v).trim() : d; }

// Turn the AI's contract analysis into the context object the generators expect.
function ctxFromAnalysis(a, contractName) {
  a = a || {};
  const org = pick(a.company, "the Contractor");
  return {
    ORG: org,
    ORGFULL: org.match(/(inc|llc|corp|ltd|company|solutions|systems|group)/i) ? org : org + ", Inc.",
    CUST: pick(a.customer, "the Customer"),
    PLATFORM: pick(a.itsmPlatform, "the ITSM platform"),
    USERS: pick(a.users, "the supported users"),
    SITES: pick(a.sites, "multiple sites"),
    HOURS: pick(a.hours, "the contracted service hours"),
    CONTRACT: pick(a.contract || contractName, "this contract"),
  };
}

function buildLive(framework, analysis, contractName) {
  const ctx = ctxFromAnalysis(analysis, contractName);
  let set;
  switch (framework) {
    case "iso27001": set = buildSet27k(ctx); break;
    case "cmmc": set = buildSetCmmc(ctx); break;
    case "iso9001": set = buildSet9001(ctx); break;
    case "iso22301": set = buildSet22301(ctx); break;
    case "iso42001": set = buildSet42001(ctx); break;
    case "soc2": set = buildSetSoc2(ctx); break;
    default: set = buildSet(ctx);
  }
  return { generated: set.generated, audit: set.audit || {}, ctx };
}

module.exports = { buildLive, ctxFromAnalysis };
