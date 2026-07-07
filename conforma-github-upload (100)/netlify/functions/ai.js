// Serverless AI proxy — keeps your Anthropic key server-side.
// Set ANTHROPIC_API_KEY in Netlify → Site settings → Environment variables.
export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: { message: "ANTHROPIC_API_KEY not set in Netlify env" } }) };
  let payload;
  try { payload = JSON.parse(event.body || "{}"); } catch { return { statusCode: 400, body: JSON.stringify({ error: { message: "bad json" } }) }; }
  const { messages, system, max_tokens } = payload;
  const body = { model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest", max_tokens: max_tokens || 4000, messages };
  if (system) body.system = system;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (!r.ok) return { statusCode: r.status, body: JSON.stringify({ error: data.error || data }) };
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) };
  } catch (e) { return { statusCode: 500, body: JSON.stringify({ error: { message: String(e) } }) }; }
};
