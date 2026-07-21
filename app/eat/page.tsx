import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export const metadata = { title: "Eat — Food & Restaurants", description: "Where to eat with crowd and wait notes." };

export default function EatPage() {
  const cards = sampleCards.filter((c) => c.category === "eat");
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Eat</h1>
      <p style={{ color: "var(--color-text-muted)" }}>Meals that fit the day without wrecking the schedule.</p>
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {cards.map((c) => <PlanningCard key={c.id} card={c} />)}
      </div>
    </div>
  );
}