"use client";

import { useState } from "react";
import { waitlistEndpoint, supabaseUrl, supabaseAnonKey } from "@/lib/config";

type Role = "buyer" | "stylist";

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <polyline points="5 13 10 18 19 7" />
  </svg>
);

export default function WaitlistForm() {
  const [role, setRole] = useState<Role>("buyer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setError("please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("loading");

    const payload = { email: trimmed.toLowerCase(), role };

    // Write to both backends. Each is independent — if one is down, the other
    // still captures the signup, so we succeed as long as either request lands.
    const writes: Promise<unknown>[] = [];

    // Google Sheet (Apps Script) doesn't send CORS headers, so we can't read the
    // response — use no-cors and treat a completed request as success. text/plain
    // keeps it a "simple" request (no CORS preflight).
    writes.push(
      fetch(waitlistEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      })
    );

    // Supabase REST insert. PostgREST sends proper CORS headers, so we can read
    // the status and treat a non-2xx as a failed write. The anon key is public;
    // the RLS "anon insert only" policy is what actually protects the table.
    if (supabaseUrl && supabaseAnonKey) {
      writes.push(
        fetch(`${supabaseUrl}/rest/v1/waitlist`, {
          method: "POST",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        }).then((res) => {
          if (!res.ok) throw new Error(`supabase ${res.status}`);
        })
      );
    }

    const results = await Promise.allSettled(writes);
    if (results.some((r) => r.status === "fulfilled")) {
      setStatus("done");
    } else {
      setStatus("idle");
      setError("something went wrong. please try again.");
    }
  }

  if (status === "done") {
    const label = role === "buyer" ? "a buyer" : "a stylist";
    return (
      <div className="signup-done">
        <strong>you&apos;re on the list.</strong> we&apos;ll be in touch when
        bundl opens.
        <small>reserved as {label}</small>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="signup-roles" role="tablist">
        <button
          type="button"
          className={role === "buyer" ? "active" : ""}
          data-role="buyer"
          aria-selected={role === "buyer"}
          onClick={() => setRole("buyer")}
        >
          i want bundles
        </button>
        <button
          type="button"
          className={role === "stylist" ? "active" : ""}
          data-role="stylist"
          aria-selected={role === "stylist"}
          onClick={() => setRole("stylist")}
        >
          i sell bundles
        </button>
      </div>
      <div className="signup-field">
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "joining…" : "join the waitlist"}
        </button>
      </div>
      {error && <div className="signup-error">{error}</div>}
      <div className="signup-foot">
        <span className="pill">
          <Check />
          100% secondhand
        </span>
        <span className="pill">
          <Check />
          real human stylists
        </span>
        <span className="pill">
          <Check />
          one curated bundle
        </span>
      </div>
    </form>
  );
}
