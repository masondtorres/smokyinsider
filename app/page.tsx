import Link from "next/link";
import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

const quickPaths = [
  { href: "/start-here", label: "First trip", meta: "Build the right trip shape" },
  { href: "/do", label: "With kids", meta: "Keep the day realistic" },
  { href: "/do", label: "Rainy day", meta: "Have a backup that works" },
  { href: "/free-and-cheap", label: "Free and cheap", meta: "Spend where it matters" },
  { href: "/stay", label: "Where to stay", meta: "Choose the right home base" },
  { href: "/best-time-to-visit", label: "When to visit", meta: "Match weather and crowds" },
];

export default function HomePage() {
  const featured = sampleCards.slice(0, 6);

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__eyebrow">Independent Smokies trip planning</div>
          <h1>Plan the Smokies like a local.</h1>
          <p className="home-hero__lead">
            Explore Sevier County, Townsend and Great Smoky Mountains National Park. Save what fits, avoid what does not and build a trip that actually works.
          </p>
          <div className="home-hero__actions">
            <Link href="/start-planning" className="hero-button hero-button--primary">
              Build my trip
            </Link>
            <Link href="/start-here" className="hero-button hero-button--secondary">
              Start with the basics
            </Link>
          </div>
        </div>
        <span className="home-hero__credit">
          Photo: National Park Service, public domain. Smoky Insider is not affiliated with the NPS.
        </span>
      </section>

      <section className="home-section home-section--tight">
        <div className="container">
          <h2 className="home-section__heading">Start with the decision in front of you</h2>
          <div className="quick-paths">
            {quickPaths.map((path) => (
              <Link key={path.label} href={path.href} className="quick-path">
                <span className="quick-path__label">{path.label}</span>
                <span className="quick-path__meta">{path.meta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--cream">
        <div className="container">
          <h2 className="home-section__heading">Featured planning cards</h2>
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

      <section className="home-section">
        <div className="container">
          <h2 className="home-section__heading">Build the day before the day builds you</h2>
          <p style={{ maxWidth: "55ch", fontSize: "1.05rem" }}>
            Save places while you browse. Organize them into days. Catch drive-time, crowd and pacing conflicts before you arrive.
          </p>
          <Link href="/my-plan" className="hero-button hero-button--primary">
            Open My Plan
          </Link>
        </div>
      </section>

      <section className="home-section home-section--cream">
        <div className="container">
          <h2 className="home-section__heading">Useful first. Honest always.</h2>
          <ul className="trust-list">
            <li>Independent site. Not affiliated with the National Park Service.</li>
            <li>Park facts use official sources with visible verification dates.</li>
            <li>Editorial guidance and sponsored content stay separated.</li>
            <li>Corrections are welcomed and reviewed.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
