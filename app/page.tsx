import Link from "next/link";
import Nav from "@/components/Nav";
import { getPublished, fmtDate } from "@/lib/articles";

export default function Home() {
  const articles = getPublished();
  return (
    <>
      <div className="aurora"><i /><i /></div>
      <div className="shell">
        <Nav />

        <section className="hero">
          <div className="hero-media" />
          <div className="hero-inner">
            <div className="eyebrow">The Autonomous Newsroom · Always On</div>
            <h1>News, <span className="g">verified</span><br />before you wake.</h1>
            <p className="lead">
              AURORA watches thousands of trusted feeds in real time — detecting, cross-checking and
              de-duplicating world events, then publishing fully original reporting. Every claim scored.
              Every source shown.
            </p>
            <div className="cta">
              <Link href="#latest" className="btn">Read the wire</Link>
              <Link href="/admin/review" className="link-underline">Review console</Link>
            </div>
          </div>
        </section>

        <section className="sec" id="latest">
          <div className="wrap">
            <div className="kicker">Auto-generated · human-reviewed</div>
            <h2 className="h2">The latest off the wire.</h2>
            <div className="grid">
              {articles.map((a) => (
                <Link key={a.id} href={`/${a.category.toLowerCase()}/${a.slug}`} className="card">
                  <div className="top"><span className="ai">{a.featuredImageLabel}</span></div>
                  <div className="b">
                    {a.breaking ? <span className="tag brk">● Breaking</span> : <span className="tag cat">{a.category}</span>}
                    <h3>{a.headline}</h3>
                    <div className="meta">
                      <span className="c"><span className="d" />Confidence {a.scores.confidence.toFixed(2)}</span>
                      <span>{fmtDate(a.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="foot">
          AURORA · AI-assisted, human-accountable journalism ·{" "}
          <Link href="/standards">Standards</Link> · <Link href="/corrections">Corrections</Link> ·{" "}
          <Link href="/ai-disclosure">AI disclosure</Link>
        </footer>
      </div>
    </>
  );
}
