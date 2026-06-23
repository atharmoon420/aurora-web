import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="in">
        <Link href="/" className="brand">AUR<b>ORA</b></Link>
        <div className="links">
          <Link href="/#latest">Latest</Link>
          <Link href="/admin/review">Review console</Link>
          <Link href="/standards">Standards</Link>
          <Link href="/ai-disclosure">AI disclosure</Link>
        </div>
        <span className="pill"><span className="d" /> LIVE</span>
      </div>
    </nav>
  );
}
