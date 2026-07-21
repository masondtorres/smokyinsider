"use client";

import { useEffect, useState } from "react";
import { addToPlan, removeFromPlan, loadPlan } from "@/lib/my-plan";

interface Props {
  cardId: string;
}

export function SaveButton({ cardId }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const plan = loadPlan();
    setSaved(plan.items.some((i) => i.cardId === cardId));
  }, [cardId]);

  function toggle() {
    if (saved) {
      removeFromPlan(cardId);
      setSaved(false);
    } else {
      addToPlan(cardId);
      setSaved(true);
    }
    window.dispatchEvent(new Event("myplan-update"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove from My Plan" : "Save to My Plan"}
      style={{
        background: saved ? "var(--color-primary)" : "transparent",
        color: saved ? "white" : "var(--color-primary)",
        border: "1.5px solid var(--color-primary)",
        borderRadius: "var(--radius-md)",
        padding: "0.35rem 0.7rem",
        fontSize: "0.8rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}