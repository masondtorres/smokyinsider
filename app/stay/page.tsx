import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export const metadata = { title: "Stay — Where to Base", description: "Town and cabin choices with honest tradeoffs." };

export default function StayPage() {
  const cards = sampleCards.filter((c) => c.category === "stay");
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Stay</h1>
      <p style={{ color: "var(--color-text-muted)" }}>Pick a base that matches how you want the trip to feel.</p>
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {cards.map((c) => <PlanningCard key={c.id} card={c} />)}
      </div>
    </div>
  );
}