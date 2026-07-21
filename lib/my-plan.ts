import { MyPlanState, SavedItem, PlanWarning, PlanningCard } from "@/types/planning";
import { getCardById } from "@/data/sample-cards";

const STORAGE_KEY = "smokyinsider-my-plan";

export function loadPlan(): MyPlanState {
  if (typeof window === "undefined") {
    return { items: [], updatedAt: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], updatedAt: new Date().toISOString() };
    const parsed = JSON.parse(raw) as MyPlanState;
    return parsed;
  } catch {
    return { items: [], updatedAt: new Date().toISOString() };
  }
}

export function savePlan(state: MyPlanState): void {
  if (typeof window === "undefined") return;
  const next = { ...state, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function addToPlan(cardId: string): MyPlanState {
  const plan = loadPlan();
  if (plan.items.some((i) => i.cardId === cardId)) return plan;
  const next: MyPlanState = {
    items: [
      ...plan.items,
      {
        cardId,
        addedAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
  savePlan(next);
  return next;
}

export function removeFromPlan(cardId: string): MyPlanState {
  const plan = loadPlan();
  const next: MyPlanState = {
    items: plan.items.filter((i) => i.cardId !== cardId),
    updatedAt: new Date().toISOString(),
  };
  savePlan(next);
  return next;
}

export function assignDay(cardId: string, day: number | undefined): MyPlanState {
  const plan = loadPlan();
  const next: MyPlanState = {
    items: plan.items.map((i) =>
      i.cardId === cardId ? { ...i, day, isAnchor: day ? i.isAnchor : false } : i
    ),
    updatedAt: new Date().toISOString(),
  };
  savePlan(next);
  return next;
}

export function setAnchor(cardId: string, isAnchor: boolean): MyPlanState {
  const plan = loadPlan();
  const item = plan.items.find((i) => i.cardId === cardId);
  if (!item || !item.day) return plan;

  const next: MyPlanState = {
    items: plan.items.map((i) => {
      if (i.cardId === cardId) return { ...i, isAnchor };
      // Only one anchor per day
      if (isAnchor && i.day === item.day) return { ...i, isAnchor: false };
      return i;
    }),
    updatedAt: new Date().toISOString(),
  };
  savePlan(next);
  return next;
}

export function clearPlan(): MyPlanState {
  const next: MyPlanState = { items: [], updatedAt: new Date().toISOString() };
  savePlan(next);
  return next;
}

export function getSavedCount(): number {
  return loadPlan().items.length;
}

/**
 * Rule engine — separate from UI.
 * Returns warnings based on current plan contents.
 */
export function evaluateWarnings(plan: MyPlanState): PlanWarning[] {
  const warnings: PlanWarning[] = [];
  const cards = plan.items
    .map((i) => ({ item: i, card: getCardById(i.cardId) }))
    .filter((x): x is { item: SavedItem; card: PlanningCard } => !!x.card);

  // Group by day
  const byDay = new Map<number, typeof cards>();
  cards.forEach((c) => {
    if (c.item.day) {
      const list = byDay.get(c.item.day) || [];
      list.push(c);
      byDay.set(c.item.day, list);
    }
  });

  // Time overload: more than ~10 hours planned in a day
  byDay.forEach((dayCards, day) => {
    const totalHours = dayCards.reduce((sum, c) => sum + c.card.estimatedHours, 0);
    if (totalHours > 10) {
      warnings.push({
        type: "time-overload",
        message: `Day ${day} has about ${totalHours.toFixed(1)} hours of activity. That leaves little buffer for travel, meals, or rest.`,
        day,
        cardIds: dayCards.map((c) => c.card.id),
      });
    }
  });

  // Two anchors same day
  byDay.forEach((dayCards, day) => {
    const anchors = dayCards.filter((c) => c.item.isAnchor);
    if (anchors.length > 1) {
      warnings.push({
        type: "two-anchors",
        message: `Day ${day} has more than one anchor. Pick one main activity so the day stays realistic.`,
        day,
        cardIds: anchors.map((c) => c.card.id),
      });
    }
  });

  // Geographic conflict (simple area check)
  byDay.forEach((dayCards, day) => {
    const areas = new Set(dayCards.map((c) => c.card.area));
    if (areas.has("Great Smoky Mountains National Park") && areas.has("Pigeon Forge") && areas.has("Gatlinburg")) {
      // mild — allow
    }
    const hasPark = areas.has("Great Smoky Mountains National Park");
    const hasTownsend = areas.has("Townsend");
    const hasGatlinburg = areas.has("Gatlinburg");
    if (hasPark && hasTownsend && hasGatlinburg && dayCards.length > 3) {
      warnings.push({
        type: "geographic-conflict",
        message: `Day ${day} mixes Townsend, Gatlinburg, and park locations. Driving time will eat the day.`,
        day,
        cardIds: dayCards.map((c) => c.card.id),
      });
    }
  });

  // Outdoor-heavy rain risk (simple flag)
  const outdoorHeavy = cards.filter(
    (c) => c.card.environment === "outdoor" && c.card.weatherFit === "rain-poor"
  );
  if (outdoorHeavy.length >= 3) {
    warnings.push({
      type: "outdoor-rain-risk",
      message: "Several outdoor, rain-sensitive stops are saved. Have a backup indoor plan ready.",
      cardIds: outdoorHeavy.map((c) => c.card.id),
    });
  }

  // Parking tag reminder
  const needsTag = cards.filter((c) => c.card.parkingTagNeeded);
  if (needsTag.length > 0) {
    warnings.push({
      type: "parking-tag-reminder",
      message: `You have ${needsTag.length} stop(s) that need a Great Smoky Mountains parking tag. Buy one before you go.`,
      cardIds: needsTag.map((c) => c.card.id),
    });
  }

  // Early start reminder
  const early = cards.filter((c) => c.card.earlyStartRecommended);
  if (early.length > 0) {
    warnings.push({
      type: "early-start-reminder",
      message: `${early.length} stop(s) work best with an early start. Parking fills fast.`,
      cardIds: early.map((c) => c.card.id),
    });
  }

  // Reservation reminder
  const needsRes = cards.filter((c) => c.card.reservationRequired);
  if (needsRes.length > 0) {
    warnings.push({
      type: "reservation-reminder",
      message: `${needsRes.length} stop(s) usually need a reservation. Confirm before you travel.`,
      cardIds: needsRes.map((c) => c.card.id),
    });
  }

  return warnings;
}