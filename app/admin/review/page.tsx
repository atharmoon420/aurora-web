"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getReviewQueue, type Article } from "@/lib/articles";

type Status = Article["status"];
const LABEL: Record<string, string> = { needs_review: "Review", published: "Published", auto_published: "Auto", held: "Held", rejected: "Rejected" };
const CLS: Record<string, string> = { needs_review: "review", published: "published", auto_published: "published", held: "held", rejected: "rejected" };
const SENSITIVE = new Set(["Politics", "Health"]);

export default function ReviewConsole() {
  const seed = useMemo(() => getReviewQueue().map((a) => ({ ...a })), []);
  const [items, setItems] = useState<Article[]>(seed);
  const [tab, setTab] = useState<string>("needs_review");
  const [sel, setSel] = useState<string>(seed.find((a) => a.status === "needs_review")?.id ?? seed[0].id);
  const [thr, setThr] = useState(0.9);

  const counts = items.reduce<Record<string, number>>((m, i) => ((m[i.status] = (m[i.status] || 0) + 1), m), {});
  const tabs = [
    { id: "needs_review", label: "Needs review" },
    { id: "published", label: "Published" },
    { id: "held", label: "Held" },
    { id: "all", label: "All" },
  ];
  const visible = items.filter((i) => tab === "all" || i.status === tab);
  const current = items.find((i) => i.id === sel);

  const confColor = (c: number) => (c >= 0.9 ? "var(--green)" : c >= 0.75 ? "var(--amber)" : "var(--magenta)");
  const route = (i: Article) => {
    if (i.distinctSources < 2) return { cls: "held", txt: "would hold" };
    if (i.scores.flagged.length) return { cls: "review", txt: "would review (flagged)" };
    if (SENSITIVE.has(i.category)) return { cls: "review", txt: "would review (sensitive)" };
    return i.scores.confidence >= thr ? { cls: "published", txt: "would auto-publish" } : { cls: "review", txt: `would review (<${thr.toFixed(2)})` };
  };

  function act(a: "approve" | "hold" | "reject", id: string) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status: (a === "approve" ? "published" : a === "hold" ? "held" : "rejected") as Status } : x)));
    const next = items.find((x) => x.status === "needs_review" && x.id !== id);
    if (next) setSel(next.id);
  }

  return (
    <>
      <div className="aurora"><i /><i /></div>
      <div className="shell">
        <div className="atop">
          <Link href="/" className="brand">AUR<b>ORA</b></Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }}
              style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", border: "1px solid var(--line2)", padding: "7px 12px", borderRadius: 9 }}
            >
              Sign out
            </button>
            <div className="who">ED</div>
          </div>
        </div>

        <div className="awrap">
          <div className="stats">
            <div className="stat"><div className="n" style={{ color: "var(--amber)" }}>{counts.needs_review || 0}</div><div className="l">In review queue</div></div>
            <div className="stat"><div className="n" style={{ color: "var(--green)" }}>{(counts.published || 0) + (counts.auto_published || 0)}</div><div className="l">Published</div></div>
            <div className="stat"><div className="n" style={{ color: "var(--muted)" }}>{counts.held || 0}</div><div className="l">Held</div></div>
            <div className="stat"><div className="n">{items.length}</div><div className="l">Total tracked</div></div>
          </div>

          <div className="tabs">
            {tabs.map((t) => (
              <button key={t.id} className={`tab ${t.id === tab ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}<span className="c">{t.id === "all" ? items.length : counts[t.id] || 0}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginLeft: 12, fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>
            <span>Auto-publish ≥</span>
            <input type="range" min={0.5} max={0.99} step={0.01} value={thr} onChange={(e) => setThr(+e.target.value)} style={{ accentColor: "var(--teal)" }} />
            <b style={{ color: "var(--teal)" }}>{thr.toFixed(2)}</b>
          </div>

          <div className="amainx" style={{ marginTop: 16 }}>
            <div className="queue">
              {visible.map((i) => {
                const rp = route(i);
                return (
                  <button key={i.id} className={`item ${i.id === sel ? "sel" : ""}`} onClick={() => setSel(i.id)}>
                    <div className="r1">
                      {i.breaking && <span className="pill" style={{ color: "#fff", background: "var(--magenta)" }}>● Breaking</span>}
                      <span className="pill" style={{ color: "var(--teal)", border: "1px solid rgba(45,226,200,.3)" }}>{i.category}</span>
                      <span className={`pill ${CLS[i.status]}`}>{LABEL[i.status]}</span>
                      {i.scores.flagged.length > 0 && <span className="pill flag">⚑ {i.scores.flagged.length} flag</span>}
                    </div>
                    <h3>{i.headline}</h3>
                    <div className="r2">
                      <span>conf<span className="confb"><i style={{ width: `${Math.round(i.scores.confidence * 100)}%`, background: confColor(i.scores.confidence) }} /></span><b style={{ color: confColor(i.scores.confidence) }}>{i.scores.confidence.toFixed(2)}</b></span>
                      <span className={`pill ${rp.cls}`} style={{ fontSize: 9 }}>{rp.txt}</span>
                    </div>
                  </button>
                );
              })}
              {visible.length === 0 && <div style={{ padding: 30, color: "var(--muted)", textAlign: "center", border: "1px dashed var(--line2)", borderRadius: 14 }}>Nothing in this view.</div>}
            </div>

            <div>
              {current ? (
                <div className="detail">
                  <div className="r1" style={{ marginBottom: 14 }}>
                    {current.breaking && <span className="pill" style={{ color: "#fff", background: "var(--magenta)" }}>● Breaking</span>}
                    <span className="pill" style={{ color: "var(--teal)", border: "1px solid rgba(45,226,200,.3)" }}>{current.category}</span>
                    <span className={`pill ${CLS[current.status]}`}>{LABEL[current.status]}</span>
                    {SENSITIVE.has(current.category) && <span className="pill flag">sensitive category</span>}
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 25, lineHeight: 1.2, marginBottom: 10 }}>{current.headline}</h2>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", display: "flex", gap: 14, flexWrap: "wrap", borderBottom: "1px solid var(--line)", paddingBottom: 16, marginBottom: 16 }}>
                    <span>AURORA Newsroom AI</span><span>{current.distinctSources} source(s)</span><span>conf {current.scores.confidence.toFixed(2)}</span>
                  </div>
                  <div className="deck" style={{ fontSize: 17 }}>{current.summary}</div>

                  <div className="bh">Article draft</div>
                  {current.body.map((p, i) => <p key={i} style={{ fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7, color: "var(--read)", marginBottom: 12 }}>{p}</p>)}

                  <div className="bh">Quality scores</div>
                  <Sb label="Originality" v={current.scores.originality} />
                  <Sb label="Source reliability" v={current.scores.sourceReliability} />
                  <Sb label="Fact-check grounding" v={current.scores.factCheck} />
                  <Sb label="Confidence" v={current.scores.confidence} />
                  {current.scores.flagged.length > 0 && (
                    <div className="flagbox"><div className="t">⚑ FLAGGED — HELD FROM AUTO-PUBLISH</div>{current.scores.flagged.map((f, i) => <p key={i}>{f}</p>)}</div>
                  )}

                  <div className="bh">Signals</div>
                  <div className="chips">
                    <span className="chip">breaking {current.signals.breaking}</span>
                    <span className="chip">trending {current.signals.trending}</span>
                    <span className="chip">virality {current.signals.virality}</span>
                  </div>

                  <div className="actions">
                    <button className="act approve" disabled={!(current.status === "needs_review" || current.status === "held")} onClick={() => act("approve", current.id)}>✓ Approve &amp; publish</button>
                    <button className="act hold" disabled={current.status === "held"} onClick={() => act("hold", current.id)}>Send back / hold</button>
                    <button className="act reject" onClick={() => act("reject", current.id)}>✕ Reject</button>
                  </div>
                </div>
              ) : (
                <div className="detail" style={{ textAlign: "center", color: "var(--muted)", padding: 50 }}>Select an item to review its package.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Sb({ label, v }: { label: string; v: number }) {
  return (
    <div className="sb">
      <div className="r"><span>{label}</span><b>{Math.round(v * 100)}%</b></div>
      <div className="t"><i style={{ width: `${Math.round(v * 100)}%` }} /></div>
    </div>
  );
}
