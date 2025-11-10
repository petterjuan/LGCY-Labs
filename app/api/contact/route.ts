import { NextResponse } from "next/server";

// Simple contact API: forwards to an external provider if configured, otherwise logs.
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data || {};

    if (!email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (FORMSPREE) {
      // Forward to Formspree (or similar) endpoint configured in env
      await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      return NextResponse.json({ ok: true });
    }

    // Fallback: log on server and return success so form works in dev
    // (Replace this with your email provider / integration in production)
    // eslint-disable-next-line no-console
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Contact API error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
