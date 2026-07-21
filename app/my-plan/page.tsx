"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadPlan, removeFromPlan, assignDay, setAnchor, clearPlan, evaluateWarnings } from "@/lib/my-plan";
import { getCardById } from "@/data/sample-cards";
import { MyPlanState, PlanWarning } from "@/types/planning";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<MyPlanState>({ items: [], updatedAt: "" });
  const [warnings, setWarnings] = useState<PlanWarning[]>([]);

  useEffect(() => {
    const p = loadPlan();
    setPlan(p);
    setWarnings(evaluateWarnings(p));
  }, []);

  function refresh() {
    const p = loadPlan();
    setPlan(p);
    setWarnings(evaluateWarnings(p));
    window.dispatchEvent(new Event("myplan-update"));
  }

  function handleRemove(id: string) {
    removeFromPlan(id);
    refresh();
  }

  function handleDay(id: string, day: string) {
    const num = day === "" ? undefined : parseInt(day, 10);
    assignDay(id, num);
    refresh();
  }

  function handleAnchor(id: string, checked: boolean) {
    setAnchor(id, checked);
    refresh();
  }

  function handleClear() {
    if (confirm("Clear your entire plan?")) {
      clearPlan();
      refresh();
    }
  }

  const cards = plan.items
    .map((i) => ({ item: i, card: getCardById(i.cardId) }))
    .filter((x) => x.card);

  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>My Plan</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Saved in this browser. Organize by day. Watch for warnings.
      </p>

      {warnings.length > 0 && (
        <div
          style={{
            background: "#fdf6f0",
            border: "1px solid var(--barn-copper)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <strong style={{ color: "var(--barn-copper)" }}>Planning notes</strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
            {warnings.map((w, idx) => (
              <li key={idx} style={{ marginBottom: "0.35rem" }}>
                {w.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cards.length === 0 ? (
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px dashed var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>Nothing saved yet.</p>
          <Link href="/do" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Browse things to do →
          </Link>
        </div>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cards.map(({ item, card }) => (
              <li
                key={item.cardId}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div>
                    <strong>{card!.name}</strong>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                      {card!.area} · {card!.timeNeeded}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <label style={{ fontSize: "0.85rem" }}>
                      Day{" "}
                      <select
                        value={item.day ?? ""}
                        onChange={(e) => handleDay(item.cardId, e.target.value)}
                        style={{ marginLeft: "0.25rem" }}
                      >
                        <option value="">—</option>
                        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </label>
                    {item.day && (
                      <label style={{ fontSize: "0.85rem" }}>
                        <input
                          type="checkbox"
                          checked={!!item.isAnchor}
                          onChange={(e) => handleAnchor(item.cardId, e.target.checked)}
                        />{" "}
                        Anchor
                      </label>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.cardId)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
              }}
            >
              Clear plan
            </button>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", alignSelf: "center" }}>
              Export and share coming next. Your plan stays in this browser for now.
            </p>
          </div>
        </>
      )}
    </div>
  );
}