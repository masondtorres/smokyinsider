import Link from "next/link";
import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

const decisionCards = [
  {
    href: "/go",
    label: "Go",
    title: "Routes & Parking",
    desc: "Traffic, arrival timing, and where the car actually goes.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80",
  },
  {
    href: "/do",
    label: "Do",
    title: "Attractions & Hikes",
    desc: "Shows, trails, rainy-day options that fit real days.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732f1e96c?auto=format&fit=crop&w=900&q=80",
  },
  {
    href: "/see",
    label: "See",
    title: "Overlooks & Scenery",
    desc: "Waterfalls, photo spots, scenic drives worth the stop.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  },
  {
    href: "/eat",
    label: "Eat",
    title: "Local Food",
    desc: "Restaurants, quick meals, family spots that work.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    href: "/stay",
    label: "Stay",
    title: "Where to Base",
    desc: "Cabins, hotels, campgrounds. Pick the right area first.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80",
  },
  {
    href: "/deals",
    label: "Deals",
    title: "Tickets & Savings",
    desc: "Discounts, free options, budget moves that matter.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
];

const quickPaths = [
  { href: "/start-here", label: "First trip", meta: "Shape and location first" },
  { href: "/do", label: "With kids", meta: "Keep the day realistic" },
  { href: "/do", label: "Rainy day", meta: "Backup that holds" },
  { href: "/deals", label: "Free and cheap", meta: "Spend where it counts" },
  { href: "/stay", label: "Where to stay", meta: "Right home base" },
  { href: "/start-here", label: "When to visit", meta: "Crowds and weather" },
];

export default function HomePage() {
  const featured = sampleCards.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__eyebrow">Independent Smokies planning</div>
          <h1>Plan your Smokies trip without the guesswork.</h1>
          <p className="home-hero__lead">
            Clear advice for Gatlinburg, Pigeon Forge, Sevierville, Townsend and Great Smoky Mountains National Park. Avoid traffic, parking mistakes and overpacked days.
          </p>
          <div className="home-hero__actions">
            <Link href="/start-here" className="hero-button hero-button--primary">
              Plan your trip
            </Link>
            <Link href="#decide" className="hero-button hero-button--secondary">
              What do you need?
            </Link>
          </div>
        </div>
        <span className="home-hero__credit">
          Photo: National Park Service, public domain. Smoky Insider is not affiliated with the NPS.
        </span>
      </section>

      {/* Decision cards */}
      <section id="decide" className="home-section">
        <div className="container">
          <h2 className="home-section__heading">What do you need help with?</h2>
          <p className="home-section__lead">Choose the decision blocking your trip right now.</p>

          <div className="decision-grid">
            {decisionCards.map((card) => (
              <Link
                key={card.href + card.label}
                href={card.href}
                className="decision-card"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(10,31,20,0.88) 0%, rgba(10,31,20,0.35) 55%, transparent 100%), url(${card.image})`,
                }}
              >
                <span className="decision-card__label">{card.label}</span>
                <h3 className="decision-card__title">{card.title}</h3>
                <p className="decision-card__desc">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Four practical rules */}
      <section className="rules-strip">
        <div className="container rules-strip__inner">
          <div className="rule">
            <span className="rule__num">1</span>
            <span>Choose one base area</span>
          </div>
          <div className="rule">
            <span className="rule__num">2</span>
            <span>Plan parking before driving</span>
          </div>
          <div className="rule">
            <span className="rule__num">3</span>
            <span>Keep one rainy-day backup</span>
          </div>
          <div className="rule">
            <span className="rule__num">4</span>
            <span>Save the plan on your phone</span>
          </div>
        </div>
      </section>

      {/* Quick starts */}
      <section className="home-section home-section--cream">
        <div className="container">
          <h2 className="home-section__heading">Quick starts</h2>
          <p className="home-section__lead">Start with the trip you are actually taking.</p>
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

      {/* Featured cards */}
      <section className="home-section">
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

      {/* My Plan CTA */}
      <section className="home-section home-section--cream">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="home-section__heading" style={{ maxWidth: "none", marginLeft: "auto", marginRight: "auto" }}>
            Build the day before the day builds you
          </h2>
          <p style={{ maxWidth: "48ch", margin: "0 auto 1.75rem", fontSize: "1.1rem" }}>
            Save places while you browse. Organize them into days. Catch drive-time and pacing problems before you arrive.
          </p>
          <Link href="/my-plan" className="hero-button hero-button--primary">
            Open My Plan
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="home-section">
        <div className="container">
          <h2 className="home-section__heading">Built for real decisions, not rankings</h2>
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
