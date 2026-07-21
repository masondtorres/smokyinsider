export const metadata = { title: "Deals", description: "Verified savings and free options. No fake urgency." };

export default function DealsPage() {
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Deals</h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "48ch" }}>
        Verified savings only. Free park days, parking-tag value, and clear skip-if notes. No countdown timers. No invented scarcity.
      </p>
      <p style={{ marginTop: "1.5rem" }}>Sample deals will appear here once verified offers are ready.</p>
    </div>
  );
}