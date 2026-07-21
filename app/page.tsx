import Link from "next/link";
import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export default function HomePage() {
  const featured = sampleCards.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--forest-pine) 0%, var(--ridge-blue) 100%)",
          color: "var(--stone-white)",
          padding: "3.5rem 0 3rem",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", marginBottom: "0.75rem", maxWidth: "18ch" }}>
            Plan the Smokies Like a Local
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "36ch", opacity: 0.95, marginBottom: "1.75rem" }}>
            Explore Sevier County, Townsend and the Great Smoky Mountains. Save what fits and build a trip that actually works.
          </p>
          <Link
            href="/start-here"
            style={{
              display: "inline-block",
              background: "var(--trail-cream)",
              color: "var(--forest-pine)",
              fontWeight: 700,
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
            }}
          >
            Start planning
          </Link>
        </div>
      </section>

      {/* Quick paths */}
      <section style={{ padding: "2.5rem 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>Quick paths</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {[
              { href: "/start-here", label: "First trip" },
              { href: "/do", label: "With kids" },
              { href: "/do", label: "Rainy day" },
              { href: "/do", label: "Free things" },
              { href: "/stay", label: "Where to stay" },
              { href: "/do", label: "Worth it?" },
            ].map((p) => (
              <Link
                key={p.label}
                href={p.href}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "999px",
                  padding: "0.45rem 1rem",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  color: "var(--color-text)",
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cards */}
      <section style={{ padding: "0 0 3rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.35rem", marginBottom: "1.25rem" }}>Featured planning cards</h2>
          <div
            style={{
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {featured.map((card) => (
              <PlanningCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* My Plan explainer */}
      <section style={{ background: "var(--map-cream)", padding: "2.5rem 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>My Plan</h2>
          <p style={{ maxWidth: "48ch", marginBottom: "1.25rem" }}>
            Save places while you browse. Organize them into days. Catch conflicts before you go. Export or share later.
          </p>
          <Link
            href="/my-plan"
            style={{
              display: "inline-block",
              background: "var(--color-primary)",
              color: "white",
              fontWeight: 600,
              padding: "0.65rem 1.25rem",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
            }}
          >
            Open My Plan
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section style={{ padding: "2.5rem 0 4rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>Built on trust</h2>
          <ul style={{ paddingLeft: "1.25rem", maxWidth: "48ch", color: "var(--color-text-muted)" }}>
            <li>Independent site. Not affiliated with the National Park Service.</li>
            <li>Park facts drawn from official sources with visible last-verified dates.</li>
            <li>Editorial content and sponsored content stay separated.</li>
            <li>Corrections welcomed.</li>
          </ul>
        </div>
      </section>
    </>
  );
}