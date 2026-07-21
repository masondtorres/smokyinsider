import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export const metadata = {
  title: "Go — Scenic Drives & Areas",
  description: "Where to go in the Smokies. Scenic drives, park areas, and town bases.",
};

export default function GoPage() {
  const cards = sampleCards.filter((c) => c.category === "go");
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Go</h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "48ch" }}>
        Scenic drives, park loops, and the areas that shape your days.
      </p>
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {cards.map((c) => (
          <PlanningCard key={c.id} card={c} />
        ))}
      </div>
    </div>
  );
}