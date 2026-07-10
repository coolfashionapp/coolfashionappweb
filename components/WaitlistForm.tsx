"use client";

import { useState } from "react";

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

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, role }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "something went wrong. please try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "something went wrong.");
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
