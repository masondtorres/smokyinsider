import { sampleCards } from "@/data/sample-cards";
import { PlanningCard } from "@/components/PlanningCard";

export const metadata = { title: "See — Views & Landmarks", description: "Overlooks, towers, and places worth the stop." };

export default function SeePage() {
  const cards = sampleCards.filter((c) => c.category === "see");
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>See</h1>
      <p style={{ color: "var(--color-text-muted)" }}>Views and landmarks with parking and timing notes.</p>
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {cards.map((c) => <PlanningCard key={c.id} card={c} />)}
      </div>
    </div>
  );
}