import Nav from "@/components/Nav";
export const metadata = { title: "AI disclosure | AURORA" };
export default function Disclosure() {
  return (<><div className="aurora"><i/><i/></div><div className="shell"><Nav/>
    <div className="doc">
      <h1>AI disclosure</h1>
      <div className="sub">Transparency about how we work</div>
      <p>AURORA uses AI to monitor sources, detect events, verify facts across sources, and write original articles. Editors review output before publication, and the newsroom is accountable for everything it publishes.</p>
      <h2>What AI does</h2>
      <ul>
        <li>Detects and de-duplicates events across thousands of feeds.</li>
        <li>Extracts and cross-checks facts; scores confidence.</li>
        <li>Writes original articles from facts — never copying sources.</li>
        <li>Generates SEO metadata, translations, and social posts.</li>
      </ul>
      <h2>What humans do</h2>
      <ul>
        <li>Review flagged, sensitive, and low-confidence stories.</li>
        <li>Approve, amend, or reject before publication.</li>
        <li>Own corrections and editorial judgement.</li>
      </ul>
    </div></div></>);
}
