// Netlify Function: secure AI proxy for Conforma.
// Keeps your Anthropic key on the server. Deploy, then set env vars:
//   ANTHROPIC_API_KEY = your Anthropic API key   (required)
//   CLAUDE_MODEL      = claude-haiku-4-5-20251001 (optional; this is the default)
//
// Health check: open this function's URL in a browser (GET). It returns
// { ok, hasKey, model } so you can confirm the key is set WITHOUT revealing it.

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Content-Type": "application/json",
  };

  const MODEL =
    process.env.CLAUDE_MODEL ||
    process.env.ANTHROPIC_MODEL ||
    "claude-haiku-4-5-20251001";

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };

  // Health check — safe, never reveals the key value.
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ ok: true, hasKey: !!process.env.ANTHROPIC_API_KEY, model: MODEL }),
    };
  }

  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: { message: "Use POST" } }) };

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: { message: "ANTHROPIC_API_KEY is not set on the server." } }) };

  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, headers: cors, body: JSON.stringify({ error: { message: "Invalid JSON body." } }) }; }

  const { messages, system, max_tokens } = payload;
  if (!Array.isArray(messages))
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: { message: "messages[] required." } }) };

  const body = {
    model: MODEL,
    max_tokens: Math.min(Number(max_tokens) || 4000, 8000),
    messages,
  };
  if (system) body.system = system;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return { statusCode: res.status, headers: cors, body: JSON.stringify(data) };
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    return { statusCode: 200, headers: cors, body: JSON.stringify({ text }) };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: { message: "Upstream call failed: " + e.message } }) };
  }
};
