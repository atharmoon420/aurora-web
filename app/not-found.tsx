import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="aurora"><i /><i /></div>
      <div className="shell" style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 22 }}>
        <div>
          <div className="brand" style={{ fontSize: 16, marginBottom: 18 }}>AUR<b>ORA</b></div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(48px,12vw,96px)", lineHeight: 1, letterSpacing: "-.03em" }}>
            <span style={{ background: "linear-gradient(100deg,var(--teal),var(--violet),var(--magenta))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>404</span>
          </h1>
          <p style={{ color: "var(--muted)", fontFamily: "var(--serif)", fontSize: 19, margin: "14px 0 28px" }}>
            This story isn&rsquo;t on the wire.
          </p>
          <Link href="/" className="btn">Back to the homepage</Link>
        </div>
      </div>
    </>
  );
}
