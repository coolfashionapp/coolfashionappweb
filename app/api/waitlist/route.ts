import { NextResponse } from "next/server";
import { saveSignup } from "@/lib/waitlist-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request." }, { status: 400 });
  }

  const { email, role } = (body ?? {}) as {
    email?: unknown;
    role?: unknown;
  };

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "please enter a valid email address." },
      { status: 400 },
    );
  }

  const normalizedRole = role === "stylist" ? "stylist" : "buyer";

  try {
    await saveSignup({
      email: email.trim().toLowerCase(),
      role: normalizedRole,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("waitlist save failed:", err);
    return NextResponse.json(
      { error: "something went wrong. please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
