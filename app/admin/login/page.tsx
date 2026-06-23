"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (res.ok) router.push("/admin/review");
    else setErr("Invalid password. Try again.");
  }

  return (
    <>
      <div className="aurora"><i /><i /></div>
      <div className="shell" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 22 }}>
        <form onSubmit={submit} className="abox" style={{ width: "min(380px,92vw)", padding: 30 }}>
          <div className="brand" style={{ fontSize: 16, marginBottom: 6 }}>AUR<b>ORA</b></div>
          <div className="bh" style={{ margin: "0 0 20px" }}>Editorial review console</div>
          <label style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>Password</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
            style={{
              width: "100%", marginTop: 8, padding: "13px 14px", borderRadius: 0,
              background: "#fff", border: "1px solid var(--line2)",
              color: "var(--paper)", fontFamily: "var(--serif)", fontSize: 15, outline: "none",
            }}
          />
          {err && <div style={{ color: "var(--magenta)", fontSize: 13, marginTop: 12 }}>{err}</div>}
          <button
            type="submit"
            disabled={busy}
            className="btn"
            style={{ width: "100%", marginTop: 18, opacity: busy ? 0.6 : 1 }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", marginTop: 16, lineHeight: 1.6 }}>
            Internal tool. In production this is backed by Auth.js / Clerk with role-based access.
          </p>
        </form>
      </div>
    </>
  );
}
