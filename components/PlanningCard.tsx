"use client";

import { PlanningCard as CardType } from "@/types/planning";
import { SaveButton } from "./SaveButton";

interface Props {
  card: CardType;
}

export function PlanningCard({ card }: Props) {
  return (
    <article
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
        <div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {card.area} · {card.category}
          </p>
          <h3 style={{ margin: "0.25rem 0 0", fontSize: "1.15rem" }}>{card.name}</h3>
        </div>
        <SaveButton cardId={card.id} />
      </div>

      <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text)" }}>
        {card.shortDescription}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {card.bestFor.slice(0, 3).map((t) => (
          <span
            key={t}
            style={{
              background: "var(--map-cream)",
              color: "var(--color-text)",
              fontSize: "0.75rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Best for: {t}
          </span>
        ))}
      </div>

      {card.skipIf.length > 0 && (
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          <strong>Skip if:</strong> {card.skipIf[0]}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
        <span>{card.timeNeeded}</span>
        <span>{card.priceRange}</span>
        {card.parkingTagNeeded && <span style={{ color: "var(--barn-copper)" }}>Parking tag</span>}
        {card.earlyStartRecommended && <span>Go early</span>}
      </div>

      {card.isSample && (
        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
          Sample card · verify before trip
        </p>
      )}
    </article>
  );
}