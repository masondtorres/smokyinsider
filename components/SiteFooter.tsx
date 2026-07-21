import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--forest-pine)",
        color: "var(--trail-cream)",
        padding: "3rem 0 6rem",
        marginTop: "4rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          <div>
            <strong style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem" }}>
              SmokyInsider
            </strong>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, marginTop: "0.5rem" }}>
              Independent planning guide for the Smokies. Not affiliated with the National Park Service or any tourism board.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Plan
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.95rem" }}>
              <li><Link href="/start-here" style={{ color: "inherit" }}>Start Here</Link></li>
              <li><Link href="/my-plan" style={{ color: "inherit" }}>My Plan</Link></li>
              <li><Link href="/go" style={{ color: "inherit" }}>Go</Link></li>
              <li><Link href="/do" style={{ color: "inherit" }}>Do</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Trust
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.95rem" }}>
              <li><Link href="/about" style={{ color: "inherit" }}>About</Link></li>
              <li><Link href="/editorial-policy" style={{ color: "inherit" }}>Editorial Policy</Link></li>
              <li><Link href="/affiliate-disclosure" style={{ color: "inherit" }}>Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" style={{ color: "inherit" }}>Privacy</Link></li>
              <li><Link href="/terms" style={{ color: "inherit" }}>Terms</Link></li>
              <li><Link href="/contact" style={{ color: "inherit" }}>Contact</Link></li>
            </ul>
          </div>
        </div>

        <p style={{ marginTop: "2.5rem", fontSize: "0.8rem", opacity: 0.75 }}>
          © {new Date().getFullYear()} SmokyInsider. Independent site. All park facts drawn from official sources and marked with verification dates. Corrections welcome.
        </p>
      </div>
    </footer>
  );
}