export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const { name, email, message } =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: "reclosed.io",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (response.ok) return Response.json({ ok: true });
  } catch {
    // Network failures use the same fallback as an upstream error response.
  }

  return Response.json({ error: "upstream" }, { status: 502 });
}
