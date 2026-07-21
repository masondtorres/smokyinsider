import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export const metadata = {
  title: "Do — Things to Do",
  description: "Hikes, attractions, and activities with honest best-for and skip-if notes.",
};

export default function DoPage() {
  const cards = sampleCards.filter((c) => c.category === "do");
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Do</h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "48ch" }}>
        Activities with time, crowd, and weather notes so you can decide fast.
      </p>
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {cards.map((c) => (
          <PlanningCard key={c.id} card={c} />
        ))}
      </div>
    </div>
  );
}