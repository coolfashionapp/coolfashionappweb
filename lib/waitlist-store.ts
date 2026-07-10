import { promises as fs } from "fs";
import path from "path";

export type Signup = {
  email: string;
  role: "buyer" | "stylist";
  created_at: string;
};

/**
 * Persists a waitlist signup.
 *
 * - In production, set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY and the signup
 *   is inserted into a `waitlist` table via the Supabase REST API.
 * - With no Supabase env configured (e.g. local dev), it appends to
 *   ./data/waitlist.jsonl so you can develop without any external service.
 */
export async function saveSignup(signup: Signup): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    await saveToSupabase(signup, url, key);
    return;
  }

  await saveToLocalFile(signup);
}

async function saveToSupabase(
  signup: Signup,
  url: string,
  key: string,
): Promise<void> {
  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(signup),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed (${res.status}): ${detail}`);
  }
}

async function saveToLocalFile(signup: Signup): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "waitlist.jsonl");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(file, JSON.stringify(signup) + "\n", "utf8");
}
