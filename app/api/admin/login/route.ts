import { NextResponse } from "next/server";

// POST { password } -> sets the aurora_session cookie on success.
// Set ADMIN_PASSWORD in the environment; defaults to a dev value for local use.
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD ?? "aurora-dev";
  if (!password || password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("aurora_session", "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
